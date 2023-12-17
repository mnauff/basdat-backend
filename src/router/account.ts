
import express from 'express'
import { addAccount, addEmailPassword } from '../controller/account.controller';

const router = express.Router();

router.post('/', addAccount)
router.patch('/:user_id', addEmailPassword)

export {router as account}