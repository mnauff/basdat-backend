
import express from 'express'
import { AddPracticum, getAllPracticum } from '../controller/practicum.controller';
import { addModule } from '../controller/module.controller';

const router = express.Router();

router.post('/', AddPracticum)
router.post('/module', addModule)
router.get('/', getAllPracticum)

export {router as practicum}