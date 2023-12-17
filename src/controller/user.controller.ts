import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { DecodedUserData } from "../types";
import { success } from "../utils/generateResponse";

export const handleUserDetail = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        res.status(401).send("Unauthorized");
        return;
    }

    const refreshToken: string = cookies.jwt;

    try {
        const user = await prisma.account.findFirst({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user) {
            res.status(403).send("Forbidden");
            return;
        }

        const jwtDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as DecodedUserData;

        if (user.user_id !== jwtDecoded.user_id) {
            res.status(403).send("Forbidden");
            return;
        }

        const { user_id, email, student, assistant } = jwtDecoded;

        const filteredUser = { user_id, email, student, assistant };
        const accessToken = jwt.sign({ user_id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });

        res.status(200).json(success(200,'OK',{ accessToken, user: filteredUser }));
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
