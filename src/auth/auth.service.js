import prisma from '../../utils/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateResponse } from '../../utils/response.js'
import { sendEmail } from '../../utils/sendEmail.js'
import { HttpStatus } from '../../constant/index.js'
import { hashPw } from '../../utils/hash.js'

export const LoginUser = async (req, res) => {
    try {
        const user = await prisma.account.findUnique({
            where: {
                accountId: req.body.accountId,
            },
        })

        const tokenExpires = 2 * 60 * 60 * 1000

        if (!user) {
            const response = generateResponse(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, {
                errors: { user: ['User not found'] },
            })
            return res.status(404).json(response)
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password) // Await the comparison

        if (!passwordMatch) {
            const response = generateResponse(HttpStatus.UNAUTHORIZED.code, 'Incorrect password. Please try again.')
            return res.status(401).json(response)
        }

        const accessToken = jwt.sign(
            {
                accountId: user.accountId,
                roles: user.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        const refreshToken = jwt.sign({ sub: user.accountId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

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
            maxAge: tokenExpires,
        })

        const response = generateResponse(HttpStatus.OK.code, HttpStatus.OK.status, {
            user_type: user.role,
            token: accessToken,
            expires_in: new Date(Date.now() + tokenExpires),
            passwordMatch,
        })
        return res.status(200).json(response)
    } catch (error) {
        console.error('An error occurred:', error)
        const response = generateResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.code,
            HttpStatus.INTERNAL_SERVER_ERROR.status
        )
        return res.status(500).json(response)
    }
}

export const updateEmailandPassword = async (req, res) => {
    try {
        const studentId = req.query.student_id || ''
        const { email, password } = req.body
        const hashedPassword = await hashPw(password)

        const userIsExist = await prisma.account.findFirst({
            where: {
                accountId: studentId,
            },
        })
        if (studentId === '' || !userIsExist) {
            const response = generateResponse(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, {
                errors: {
                    user: ['studentId is required'],
                },
            })

            return res.status(404).json(response)
        }

        const account = await prisma.account.update({
            where: {
                accountId: studentId,
            },
            data: {
                email: email,
                password: hashedPassword,
            },
            select: {
                accountId: true,
                email: true,
                role: true,
            },
        })

        const response = generateResponse(HttpStatus.OK.code, HttpStatus.OK.status, account)

        return res.status(404).json(response)
    } catch (error) {
        console.error('An error occurred:', error)
        const response = generateResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.code,
            HttpStatus.INTERNAL_SERVER_ERROR.status
        )
        return res.status(500).json(response)
    }
}

export const forgotPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body
        const user = await prisma.account.findUnique({
            where: {
                email: email,
            },
        })
        if (!user) {
            const response = generateResponse(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, {
                errors: { user: ['User not found'] },
            })
            return res.status(404).json(response)
        }

        const token = jwt.sign({ sub: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

        await prisma.account.update({
            where: {
                email: email,
            },
            data: {
                refreshToken: token,
            },
        })

        const redirectLink = `http://localhost:8888/api/v1/auth/forgot-password?token=${token}&id=${user.id}`

        await sendEmail(email, 'Password reset', redirectLink)

        const response = generateResponse(200, 'OK', { message: `Forgot password request sent to ${email}` })
        return res.status(200).json(response)
    } catch (error) {
        console.error('An error occurred:', error)
        const response = generateResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.code,
            HttpStatus.INTERNAL_SERVER_ERROR.status
        )
        return res.status(500).json(response)
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { password } = req.body
        const token = req.query.token
        const id = req.query.id

        if (!token) {
            const response = generateResponse(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, {
                errors: {
                    token: ['Invalid or expired password reset token!'],
                },
            })
            return res.status(404).json(response)
        }

        if (!id) {
            const response = generateResponse(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, {
                errors: {
                    user: ['User is not found!'],
                },
            })
            return res.status(404).json(response)
        }

        const user = await prisma.account.findUnique({
            where: {
                id: id,
            },
        })

        if (!user || user.refreshToken !== token) {
            const response = generateResponse(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, {
                errors: {
                    token: ['Invalid or expired password reset token!'],
                },
            })
            return res.status(401).json(response)
        }

        // Update the user's password
        const hashedPassword = await hashPw(password)

        await prisma.account.update({
            where: {
                id: id,
            },
            data: {
                password: hashedPassword,
                refreshToken: null,
            },
        })

        const response = generateResponse(200, 'OK', { message: 'Password reset successful' })
        return res.status(200).json(response)
    } catch (error) {
        console.error('An error occurred:', error)
        const response = generateResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.code,
            HttpStatus.INTERNAL_SERVER_ERROR.status
        )
        return res.status(500).json(response)
    }
}
