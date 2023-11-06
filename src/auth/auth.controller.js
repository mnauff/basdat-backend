import express from 'express'
import { LoginUser } from './auth.service.js'

const router = express.Router()

router.post('/login', LoginUser)

export { router as auth }
