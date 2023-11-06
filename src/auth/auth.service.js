import prisma from '../../utils/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const LoginUser = async (req, res) => {
    try {
        const user = await prisma.account.findUnique({
            where: {
                accountId: req.body.accountId,
            },
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' })
        }

        // JWT Authentication
        const accessToken = jwt.sign(
            {
                accountId: user.accountId,
                roles: user.role,
            },
            process.env.ACCESS_TOKEN_SECRET, // Store secret key in an environment variable
            { expiresIn: '1h' }
        )

        const refreshToken = jwt.sign(
            { sub: user.accountId },
            process.env.REFRESH_TOKEN_SECRET, // Store secret key in an environment variable
            { expiresIn: '1d' }
        )

        await prisma.account.update({
            where: {
                accountId: req.body.accountId,
            },
            data: {
                refreshToken: refreshToken,
            },
        })

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            message: 'Login successful',
            success: true,
            data: { user_type: user.role, token: accessToken },
        })
    } catch (error) {
        console.error('An error occurred:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
