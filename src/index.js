import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { account } from './account/account.controller.js'
import { auth } from './auth/auth.controller.js'
import { verifyJwt } from './middleware/verifyJwt.js'
import { practicum } from './practicum/practicum.controller.js'

const app = express()

// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Define your routes here
app.use('/api/v1/account', verifyJwt, account)
app.use('/api/v1/auth', auth)
app.use('/api/v1/practicum', practicum)

app.listen(8888, () => {
    console.log(`Server is running on port ${8888}`)
})
