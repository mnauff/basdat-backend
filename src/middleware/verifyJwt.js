import jwt from 'jsonwebtoken'
import { generateResponse } from '../../utils/response.js'
import { HttpStatus } from '../../constant/index.js'
/** */
export const verifyJwt = (req, res, next) => {
    const currentURL = req.protocol + '://' + req.get('host') + req.originalUrl

    const authHeader = req.headers['authorization']

    if (!authHeader) {
        const response = generateResponse(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status)
        return res.status(401).json(response)
    }

    const token = authHeader.split(' ')[1]

    try {
        const jwtDecode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userData = jwtDecode
    } catch (error) {
        return res.status(401).json({
            response: {
                status: 401,
                message: 'BAD_REQUEST',
                url: currentURL,
            },
            errors: ['Account unauthorized'],
        })
    }

    next()
}
