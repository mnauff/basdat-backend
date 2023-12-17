"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPracticum = exports.getPracticumByID = exports.getPracticum = void 0;
const tslib_1 = require("tslib");
const prisma_1 = tslib_1.__importDefault(require("../utils/prisma"));
const getPracticum = async (page, limit, sort = 'practicum_name', query, asc = true) => {
    const parsedLimit = limit ? parseInt(limit) : 5;
    const parsedPage = page ? parseInt(page) : 1;
    const practicums = await prisma_1.default.practicum.findMany({
        take: parsedLimit || 5,
        skip: (parsedPage ? parsedPage - 1 : 0) * (parsedLimit || 5),
        orderBy: {
            [sort]: asc ? "asc" : "desc",
        },
        where: {
            OR: [
                {
                    practicum_name: {
                        contains: query || '',
                        mode: 'insensitive',
                    },
                },
                {
                    place: {
                        contains: query || '',
                        mode: 'insensitive',
                    },
                },
            ],
        },
    });
    return practicums;
};
exports.getPracticum = getPracticum;
const getPracticumByID = async (practicum_id) => {
    const practicum = await prisma_1.default.practicum.findUnique({
        where: {
            practicum_id: practicum_id,
        },
    });
    return practicum;
};
exports.getPracticumByID = getPracticumByID;
const createPracticum = async (practicum_name, place, start_date, end_date) => {
    const practicum = await prisma_1.default.practicum.create({
        data: {
            practicum_name: practicum_name,
            place: place,
            start_date: start_date,
            end_date: end_date,
        },
    });
    return practicum;
};
exports.createPracticum = createPracticum;
//# sourceMappingURL=practicum.service.js.map