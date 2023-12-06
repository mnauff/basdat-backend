import { hashPw } from '../../utils/hash.js'
import prisma from '../../utils/prisma.js'
import { v4 as uuidv4 } from 'uuid'

/** Melihat berdasarkan jenis praktikum  */
export const getAllPracticum = async (req, res) => {
    try {
        const practicums = await prisma.practicum.findMany()
        if (practicums.length === 0) {
            return res.status(404).json({
                message: 'No practicums found in the database.',
            })
        }
        res.json(practicums)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        })
    }
}

/** Melihat berdasarkan Id  */
export const getById = async (req, res) => {
    try {
        const { id } = req.params
        const createId = uuidv4()

        const existingPracticum = await prisma.practicum.findUnique({
            where: {
                practicumId: id,
                /** sama name: name, dengan name, */
            },
        })

        if (!existingPracticum) {
            return res.status(404).json({ message: 'Not Found!' })
        }
        /**kalo berhasil menampilkan */
        return res.status(200).json(existingPracticum)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

/** Mengganti nilai item praktikum */
export const patchById = async (req, res) => {
    try {
        /**Req dari parameter id jadi parameter (12c8124e-cf30-45a4-9e24-18ff437e56d1) */
        const { id } = req.params
        /**Req dari Body */
        const { name, place, time } = req.body
        const createId = uuidv4()

        const existingPracticum = await prisma.practicum.update({
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

        if (!existingPracticum) {
            return res.status(404).json({ message: 'Not Found!' })
        }
        /**kalo berhasil menampilkan */
        return res.status(200).json(existingPracticum)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

/** Menghapus Id Praktikum (Jenis Praktikum) */
export const delById = async (req, res) => {
    try {
        /**Req dari parameter id jadi parameter (12c8124e-cf30-45a4-9e24-18ff437e56d1) */
        const { id } = req.params

        const existingPracticum = await prisma.practicum.delete({
            where: {
                practicumId: id,
                /** sama name: name, dengan name, */
            },
        })

        if (!existingPracticum) {
            return res.status(404).json({ message: 'Not Found!' })
        }
        /**kalo berhasil menampilkan */
        return res.status(200).json({ message: `praktikum with ${id} has been deleted` })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

/** Membuat data praktikum  */
export const createPracticum = async (req, res) => {
    try {
        const { name, place, time } = req.body
        const createId = uuidv4()

        const existingPracticum = await prisma.practicum.findFirst({
            where: {
                name: name,
                /** sama name: name, dengan name, */
            },
        })

        if (existingPracticum) {
            return res.status(400).json({ message: 'Practicum already exists!' })
        }

        // Create the account
        await prisma.practicum.create({
            data: {
                practicumId: createId,
                name: name,
                place: place,
                time: time,
            },
        })

        return res.status(200).json({ message: 'Account created successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
