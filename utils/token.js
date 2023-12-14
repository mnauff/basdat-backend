import jwt from 'jsonwebtoken'

export const createJWTToken = (payload, secretKey, expiresIn) => {
    try {
        // Create the JWT token with the provided payload, secret key, and expiration time
        const token = jwt.sign(payload, secretKey, { expiresIn })
        return token
    } catch (error) {
        // Handle token generation errors here
        console.error('Error generating JWT token:', error)
        return null
    }
}
