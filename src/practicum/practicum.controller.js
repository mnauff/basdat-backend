import express from 'express'
import { createPracticum, getAllPracticum } from './practicum.service.js'

const router = express.Router()

router.get('/', getAllPracticum)
router.post('/', createPracticum)

export { router as practicum }
