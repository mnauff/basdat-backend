
import express from 'express'
import { addGroupToModule, createGroups } from '../controller/group.controller';

const router = express.Router();

router.post('/', createGroups)
router.post('/module', addGroupToModule)

export {router as group}