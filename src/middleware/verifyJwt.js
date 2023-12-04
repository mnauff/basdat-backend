import jwt from 'jsonwebtoken'
/** */
export const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'] // The header should be 'Authorization' with a capital 'A'

    if (!authHeader) {
        return res.sendStatus(401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const jwtDecode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userData = jwtDecode
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized',
        })
    }

    next()
}
