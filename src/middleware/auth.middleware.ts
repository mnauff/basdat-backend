import express from 'express';
import { errors } from '../utils/generateResponse';
import jwt from 'jsonwebtoken';
import { ROLES } from '../service/account.service';

export interface DecodedUserData {
    user_id: string;
    email: string;
    role: ROLES;
    student: string | '' | undefined | null;
    assistant: string | '' | undefined | null;
}

export interface ValidationRequest extends express.Request {
    user_data?: DecodedUserData; // Making user_data optional since it might not exist before decoding
}

export const tokenValidation = (req: ValidationRequest, res: express.Response, next: express.NextFunction) => {
    const { authorization } = req.headers;


    if (!authorization) {
        return res.status(401).json(errors(401, 'UNAUTHORIZED', { message: 'Token is required!' }));
    }
    const token = authorization.split(' ')[1]; // Use index 1 to get the token part
    const secret = process.env.REFRESH_TOKEN_SECRET;

    try {
        const jwtDecode = jwt.verify(token, secret) as DecodedUserData;

        req.user_data = jwtDecode;
        return next(); // Return next() to proceed to the next middleware
    } catch (error) {
        console.log(error);
        return res.status(403).json(errors(403, 'FORBIDDEN', { message: 'Invalid token!' }));
    }
};