import express from 'express'
import { createAccount, getAllAccount } from '../controller/user.controller.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ msg: 'Hello' })
})
router.get('/account', getAllAccount)
router.post('/account', createAccount)
export default router
