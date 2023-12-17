import express from 'express' 
import http from 'http' 
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { student } from './router/student';
import { practicum } from './router/practicum';
import { group } from './router/group';
import { assistant } from './router/assistant';
import { account } from './router/account';
import { auth } from './router/auth';
import { tokenValidation } from './middleware/auth.middleware';
import { user } from './router/user';
// import { getUserDetail } from './controller/account.controller';
// import { user } from './router/user';

const app = express()
app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api/v1/student', student)
app.use('/api/v1/group', group)
app.use('/api/v1/practicum', practicum)
app.use('/api/v1/assistant', assistant)
app.use('/api/v1/account', account)
app.use('/api/v1/auth', auth)
app.use('/api/v1/me', user)

const server = http.createServer(app)

server.listen(8888)