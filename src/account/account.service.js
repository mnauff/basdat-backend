import { hashPw } from '../../utils/hash.js'
import prisma from '../../utils/prisma.js'
import { v4 as uuidv4 } from 'uuid'
import { generateResponse } from '../../utils/response.js'

export const getAllAccount = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 3
        const offset = (page - 1) * limit
        const student_id = req.query.student_id || ''
        const sort = req.query.sort || 'accountId'
        const sortBy = req.query.sort_by || 'asc'

        const accounts = await prisma.account.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                [sort]: sortBy,
            },
            where: {
                accountId: {
                    contains: student_id,
                },
            },
            select: {
                accountId: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        if (accounts.length === 0) {
            const response = generateResponse(404, 'BAD_REQUEST', { errors: { user: ['User not found'] } })
            return res.status(404).json(response)
        }

        const response = generateResponse(200, 'OK', accounts)
        return res.json(response)
    } catch (error) {
        console.log(error)
        const response = generateResponse(500, 'Internal Server Error')
        return res.status(500).json(response)
    }
}

export const createAccount = async (req, res) => {
    try {
        const { accountId, role } = req.body
        const hashedPassword = await hashPw(password)
        const createId = uuidv4()

        const isStudent = await prisma.student.findFirst({
            where: {
                studentId: accountId,
            },
        })

        const existingAccount = await prisma.account.findFirst({
            where: {
                accountId: accountId,
            },
        })

        if (role === 'STUDENT') {
            if (!isStudent) {
                const response = generateResponse(404, 'BAD_REQUEST', { errors: { user: ['User not found'] } })
                return res.status(404).json(response)
            }
        }

        if (existingAccount) {
            return res.status(400).json({ message: 'Account already exists!' })
        }

        await prisma.account.create({
            data: {
                id: createId,
                accountId,
                password: hashedPassword,
                role: role,
            },
        })

        const newUser = await prisma.student.update({
            where: { studentId: accountId },
            data: {
                accountId: createId,
            },
        })

        const response = generateResponse(201, 'OK', { student_id: newUser.studentId })
        return res.status(201).json(response)
    } catch (error) {
        console.log(error)
        const response = generateResponse(500, 'BAD_REQUEST', { error: { server: ['Internal server error', error] } })
        return res.status(500).json(response)
    }
}
