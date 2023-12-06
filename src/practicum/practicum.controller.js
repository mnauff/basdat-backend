import express from 'express'
import { createPracticum, getAllPracticum, getById, patchById, delById } from './practicum.service.js'

const router = express.Router()

router.get('/', getAllPracticum)
router.post('/', createPracticum)
router.get('/:id', getById)
router.patch('/:id', patchById)
router.delete('/:id', delById)

export { router as practicum }
