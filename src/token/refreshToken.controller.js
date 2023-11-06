import jwt from 'jsonwebtoken'
import prisma from '../../utils/prisma.js'

export const handleRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.jwt

    if (!refreshToken) {
        return res.sendStatus(401)
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        // Check if the decoded token contains the expected properties
        if (!decoded || !decoded.sub) {
            return res.sendStatus(403)
        }

        const user = await prisma.account.findUnique({
            where: {
                accountId: user.accountId,
                roles: user.role,
            },
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Generate a new access token
        const accessToken = jwt.sign(
            {
                sub: user.accountId, // Assuming sub is the user's accountId
                roles: user.role,
            },
            process.env.ACCESS_TOKEN_SECRET, // Store secret key in an environment variable
            { expiresIn: '1h' }
        )

        return res.status(200).json({ accessToken })
    } catch (error) {
        console.error('An error occurred:', error)
        return res.sendStatus(500)
    }
}
