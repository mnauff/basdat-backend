import { hashPw } from '../../utils/hash.js'
import prisma from '../../utils/prisma.js'
import { v4 as uuidv4 } from 'uuid'

export const getAllPracticum = async (req, res) => {
    try {
        const practicums = await prisma.practicum.findMany()
        if (practicums.length === 0) {
            return res.status(404).json({
                message: 'No practicums found in the database.',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
}

export const createPracticum = async (req, res) => {
    try {
        const { accountId, password, role } = req.body
        const hashedPassword = await hashPw(password) // Assuming 'hashPw' is an asynchronous function
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
                return res.status(400).json({ message: 'Student ID is not found!' })
            }
        }

        if (existingAccount) {
            return res.status(400).json({ message: 'Account already exists!' })
        }

        // Create the account
        await prisma.account.create({
            data: {
                id: createId,
                accountId,
                password: hashedPassword,
                role: role,
            },
        })

        // Update the student to link it to the created account
        await prisma.student.update({
            where: { studentId: accountId },
            data: {
                accountId: createId, // Assuming you want to link the student to the account using 'accountId'
            },
        })

        return res.status(200).json({ message: 'Account created successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
