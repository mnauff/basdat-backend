import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router/index.js'

const app = express()

// Middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
// Define your routes here
app.use('/api/v1', router)

app.listen(8888, () => {
    console.log(`Server is running on port ${8888}`)
})
