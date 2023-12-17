
import express from 'express'
import { Login, handleVerifyOtp } from '../controller/auth.controller';
import { handleRefreshToken } from '../controller/refreshToken.controller';

const router = express.Router();

router.post('/login', Login)
router.get('/refresh', handleRefreshToken)
router.post('/otp', handleVerifyOtp)

export {router as auth}