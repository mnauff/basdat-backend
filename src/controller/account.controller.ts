import { createAccount, updateEmailPasswords } from './../service/account.service';
import express from 'express';
import { errors, success } from '../utils/generateResponse';
import { hashPassword } from '../utils/authentication';

import { createOtpService } from '../service/auth.service';

export const addAccount = async (req: express.Request, res: express.Response) => {
  try {
    const { user_id, role } = req.body;
    const newAccount = createAccount(user_id, role);
    res.status(200).json(success(200, 'OK', { newAccount }));
  } catch (error) {
    console.log(error);
    res.status(500).json(errors(500, 'INTERNAL_SERVER_ERROR', { error: 'Internal Server Error' }));
  }
};

export const addEmailPassword = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const { user_id } = req.params;

    const hashPw = await hashPassword(password);
    await updateEmailPasswords(user_id, email, hashPw);
    await createOtpService(email);

    res.status(200).json(success(200, 'OK', 'Check your email for the OTP code for verification!'));
  } catch (error) {
    console.log(error);
    
    res.status(500).json(errors(500, 'INTERNAL_SERVER_ERROR', { error: 'Internal Server Error' }));
  }
};

