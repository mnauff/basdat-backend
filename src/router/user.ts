
import express from 'express'
import { tokenValidation } from '../middleware/auth.middleware';
import { handleUserDetail } from '../controller/user.controller';

const router = express.Router();

router.get('/', handleUserDetail)

export {router as user}