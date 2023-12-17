import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { DecodedUserData } from "../types";

export const handleRefreshToken = async (req: Request, res: Response): Promise<void> => {
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


        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: jwt.VerifyErrors | null, decoded: DecodedUserData) => {
            if (err || user.user_id !== decoded.user_id) {
                res.status(403).send("Forbidden");
                return;
            }

            const accessToken = jwt.sign({ user_id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
            res.json({ accessToken });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
