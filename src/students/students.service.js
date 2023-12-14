import { hashPw } from '../../utils/hash.js'
import prisma from '../../utils/prisma.js'
import { v4 as uuidv4 } from 'uuid'

/** Melihat berdasarkan jenis praktikum  */
export const getAllStudents = async (req, res) => {
    const currentURL = req.protocol + '://' + req.get('host') + req.originalUrl
    try {
        const students = await prisma.student.findMany()
        if (students.length === 0) {
            return res.status(404).json({
                message: 'No studnets found in the database.',
            })
        }
        res.json({
            response: {
                status: 200,
                message: 'OK',
                url: currentURL,
            },
            data: students,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
}

/** Melihat berdasarkan Id  */
export const getById = async (req, res) => {
    const currentURL = req.protocol + '://' + req.get('host') + req.originalUrl
    try {
        const { studentId } = req.params

        const existingStudents = await prisma.student.findUnique({
            where: {
                studentId: studentId,
                /** sama name: name, dengan name, */
            },
        })

        if (!existingStudents) {
            return res.status(404).json({ message: 'Not Found!' })
        }
        /**kalo berhasil menampilkan */
        return res.json({
            response: {
                status: 200,
                message: 'OK',
                url: currentURL,
            },
            data: existingStudents,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

/** Mengganti nilai item praktikum */
export const patchById = async (req, res) => {
    const currentURL = req.protocol + '://' + req.get('host') + req.originalUrl
    try {
        /**Req dari parameter id jadi parameter (12c8124e-cf30-45a4-9e24-18ff437e56d1) */
        const { id } = req.params
        /**Req dari Body */
        const { name, place, time } = req.body
        const createId = uuidv4()

        const existingStudents = await prisma.student.update({
            where: {
                practicumId: id,
                /** sama name: name, dengan name, */
            },
            data: {
                name: name,
                place: place,
                time: time,
            },
        })

        if (!existingStudents) {
            return res.status(404).json({ message: 'Not Found!' })
        }
        /**kalo berhasil menampilkan */
        return res.status(200).json({
            response: {
                status: 200,
                message: 'OK',
                url: currentURL,
            },
            data: existingStudents,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

/** Menghapus Id Praktikum (Jenis Praktikum) */
export const delById = async (req, res) => {
    const currentURL = req.protocol + '://' + req.get('host') + req.originalUrl
    try {
        /**Req dari parameter id jadi parameter (12c8124e-cf30-45a4-9e24-18ff437e56d1) */
        const { id } = req.params

        const existingStudents = await prisma.student.delete({
            where: {
                practicumId: id,
                /** sama name: name, dengan name, */
            },
        })

        if (!existingStudents) {
            return res.status(404).json({ message: 'Not Found!' })
        }
        /**kalo berhasil menampilkan */
        return res.status(200).json({
            response: {
                status: 200,
                message: `student with ${id} has been deleted`,
                url: currentURL,
            },
            data: id,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

/** Membuat data praktikum  */
export const createStudents = async (req, res) => {
    const currentURL = req.protocol + '://' + req.get('host') + req.originalUrl
    try {
        const { studentId, name } = req.body

        const existingStudents = await prisma.student.findFirst({
            where: {
                studentId: studentId,
                /** sama name: name, dengan name, */
            },
        })

        if (existingStudents) {
            return res.status(400).json({ message: 'Student already exists!' })
        }

        // Create the account
        const students = await prisma.student.create({
            data: {
                studentId: studentId,
                name: name,
            },
        })
        return res.status(200).json({
            response: {
                status: 200,
                message: 'OK',
                url: currentURL,
            },
            data: students,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
