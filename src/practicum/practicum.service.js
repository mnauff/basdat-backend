import prisma from '../../utils/prisma.js'
import { v4 as uuidv4 } from 'uuid'
import { generateResponse } from '../../utils/response.js'
import { HttpStatus } from '../../constant/index.js'

/** Melihat berdasarkan jenis praktikum  */
export const getAllPracticum = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 3
        const offset = (page - 1) * limit
        const search = req.query.search || ''
        const sort = req.query.sort || 'practicumName'
        const sortBy = req.query.sort_by || 'asc'

        const practicums = await prisma.practicum.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                [sort]: sortBy,
            },
            where: {
                practicumName: {
                    contains: search,
                },
            },
            select: {
                practicumName: true,
                place: true,
                date: true,
                modules: true,
            },
        })

        if (practicums.length === 0) {
            const response = generateResponse(404, 'No practicums found in the database.')
            return res.status(404).json(response)
        }

        const response = generateResponse(200, 'OK', { practicums })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        const response = generateResponse(500, 'INTERNAL_SERVER_ERROR', {
            server: ['Internal server error', error],
        })
        return res.status(500).json(response)
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params

        const existingPracticum = await prisma.practicum.findUnique({
            where: {
                practicumId: id,
            },
        })

        if (!existingPracticum) {
            const response = generateResponse(404, 'Not Found!')
            return res.status(404).json(response)
        }

        const response = generateResponse(200, 'OK', { existingPracticum })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        const response = generateResponse(500, 'INTERNAL_SERVER_ERROR', { server: ['Internal server error', error] })
        return res.status(500).json(response)
    }
}

export const patchById = async (req, res) => {
    try {
        const { id } = req.params
        const { name, place, time } = req.body

        const existingPracticum = await prisma.practicum.update({
            where: {
                practicumId: id,
            },
            data: {
                name: name,
                place: place,
                time: time,
            },
        })

        if (!existingPracticum) {
            const response = generateResponse(404, 'Not Found!')
            return res.status(404).json(response)
        }

        const response = generateResponse(200, 'OK', { existingPracticum })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        const response = generateResponse(500, 'INTERNAL_SERVER_ERROR', { server: ['Internal server error', error] })
        return res.status(500).json(response)
    }
}

export const delById = async (req, res) => {
    try {
        const { id } = req.params

        const existingPracticum = await prisma.practicum.delete({
            where: {
                practicumId: id,
            },
        })

        if (!existingPracticum) {
            const response = generateResponse(404, 'Not Found!')
            return res.status(404).json(response)
        }

        const response = generateResponse(200, 'OK', `Practicum with ${id} has been deleted`)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        const response = generateResponse(500, 'INTERNAL_SERVER_ERROR', { server: ['Internal server error', error] })
        return res.status(500).json(response)
    }
}

export const createPracticum = async (req, res) => {
    try {
        const { practicumName, place, startDate, endDate } = req.body
        const createId = uuidv4()

        const existingPracticum = await prisma.practicum.findFirst({
            where: {
                practicumName: practicumName,
            },
        })

        if (existingPracticum) {
            const response = generateResponse(HttpStatus.CONFLICT.code, HttpStatus.CONFLICT.status, {
                server: ['Practicum is already added!'],
            })
            return res.status(409).json(response)
        }

        const practicum = await prisma.practicum.create({
            data: {
                practicumId: createId,
                practicumName,
                place,
                startDate,
                endDate,
            },

            select: {
                practicumId: true,
                practicumName: true,
            },
        })

        const response = generateResponse(201, 'OK', practicum)
        return res.status(201).json(response)
    } catch (error) {
        console.log(error)
        const response = generateResponse(500, 'INTERNAL_SERVER_ERROR', { server: ['Internal server error', error] })
        return res.status(500).json(response)
    }
}
