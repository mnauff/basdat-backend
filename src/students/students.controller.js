import express from 'express'
import { createStudents, getAllStudents, getById, patchById, delById } from './students.service.js'

const router = express.Router()

router.get('/', getAllStudents)
router.post('/', createStudents)
router.get('/:id', getById)
router.patch('/:id', patchById)
router.delete('/:id', delById)

export { router as students }
