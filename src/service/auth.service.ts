import argon2d from 'argon2';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail';
import prisma from '../utils/prisma';

export const createOtpService = async (email: string) => {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  const hashedOtp = await argon2d.hash(otp);

  try {
    // Find the user by email
    const user = await prisma.account.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new Error('User not found'); // Handle case where user is not found
    }

    // Save the OTP in the database and associate it with the user
    const otp_code = await prisma.oTP.create({
      data: {
        user: { connect: { email: email } },
        otpSecret: hashedOtp,
      },
    });

    // Generate token (assuming it's related to OTP verification)
    const expiredIn = 60 * 60 * 24;
    const token = jwt.sign({ email: otp_code.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });

    // Update the user's refresh token
    await prisma.account.update({
      where: {
        email: email,
      },
      data: {
        refresh_token: token,
      },
    });

    // Email the OTP to the user
    const url = `http://localhost:8888/api/v1/auth/otp?token=${token}&email=${otp_code.email}`;
    const emailSubject = 'Your OTP for Verification';
    const emailHTML = `<p>Your OTP for verification is: <strong>${otp}</strong></p>
                       <p>To verify, please go to <a href="${url}">this link</a>.</p>`;

    await sendEmail(email, emailSubject, emailHTML);

    return { success: true, message: 'OTP sent and user updated successfully' };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'Failed to send OTP or update user' };
  }
};

export const verifyOtp = async (otp: string) => {
  const userOtp = await prisma.oTP.findFirst({
    where: {
      otpSecret: otp,
    },
  });

  return userOtp;
};
