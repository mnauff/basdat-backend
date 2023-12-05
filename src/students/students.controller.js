import express from 'express'
import { createStudents, getAllStudents, getById, patchById, delById } from './practicum.service.js'

const router = express.Router()

router.get('/', getAllStudents)
router.post('/', createStudents)
router.get('/:sid', getById)
router.patch('/:sid', patchById)
router.delete('/:sid', delById)

export { router as students }
