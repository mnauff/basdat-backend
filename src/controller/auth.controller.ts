import express from 'express';
import { errors, success } from '../utils/generateResponse';
import argon2d from 'argon2';
import { addRefreshToken, getAccountByUserId } from '../service/account.service';
import jwt from 'jsonwebtoken';
import { verifyOtp } from '../service/auth.service';
import prisma from '../utils/prisma';

export const Login = async (req: express.Request, res: express.Response) => {
  try {
    const { user_id, password } = req.body;
    const account = await getAccountByUserId(user_id);
    if (!user_id || !password)
      return res.status(400).json({ message: 'User ID and password are required.' });

    const comparePassword = argon2d.verify(account.password, password);

    const expires_in = 60 * 60 * 1;

    const payload = {
      user_id: account.user_id,
      email: account.email,
      role: account.role,
      student: account.role === 'STUDENT' ? account.student.name : '',
      assistant: account.role === 'ASSISTANT' ? account.assistant.assistant_name : '',
    };

    if (comparePassword) {
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' });
      const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: expires_in,
      });

      await addRefreshToken(user_id, refresh_token);

      res.cookie('jwt', refresh_token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: expires_in,
      });

      res
        .status(200)
        .json(success(200, 'OK', { message: 'Login successfully!', token: accessToken }));
    } else {
      res
        .status(401)
        .json(errors(401, 'UNAUTHORIZED', { error: 'User ID or password incorrect!' }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleVerifyOtp = async (req: express.Request, res: express.Response) => {
  const { otp } = req.body;
  const { token, email } = req.query;
  
  if (!otp) {
    return res.status(400).json({ success: false, message: 'OTP is required' });
  }
  try {
    const user = await prisma.oTP.findUnique({
      where: {
        email: email as string,
      },
    });

    const matchOtp = await argon2d.verify(user.otpSecret, otp);

    if (matchOtp) {
      await prisma.account.update({
        where: {
          email: email as string,
          refresh_token: token as string,
        },
        data: {
          is_verified: true,
        },
      });
      res.status(200).json({ message: 'Account has been verified!' });
      await prisma.oTP.delete({
        where: {
          email: email as string,
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'OTP is wrong' });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json(errors(500, 'INTERNAL_SERVER_ERROR', { error: 'Internal Server Error' }));
  }
};
