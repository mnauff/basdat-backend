import express from 'express'
import { LoginUser, forgotPassword, forgotPasswordRequest, updateEmailandPassword } from './auth.service.js'

const router = express.Router()

router.post('/login', LoginUser)
router.post('/forgot-password-request', forgotPasswordRequest)
router.patch('/forgot-password', forgotPassword)
router.patch('/update-email-password', updateEmailandPassword)

export { router as auth }
