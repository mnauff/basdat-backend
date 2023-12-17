
import express from 'express'
import { addAssistant, addAssistantPracticum } from '../controller/assistant.controller';

const router = express.Router();

router.post('/', addAssistant)
router.post('/practicum', addAssistantPracticum)

export {router as assistant}