import express from 'express'
import { createAccount, getAllAccount } from './account.service.js'

const router = express.Router()

router.get('/', getAllAccount)
router.post('/', createAccount)

export { router as account }
