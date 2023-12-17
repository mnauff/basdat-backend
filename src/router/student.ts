import { addGrade } from '../controller/grade.controller';
import { AddStudent, getStudent } from '../controller/student.controller';
import express from 'express'

const router = express.Router();

router.post('/', AddStudent)
router.post('/grade', addGrade)
router.get('/', getStudent)

export {router as student}