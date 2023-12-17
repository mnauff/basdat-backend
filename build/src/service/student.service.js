"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudent = exports.createStudent = exports.getStudentByID = exports.getAllStudent = void 0;
const tslib_1 = require("tslib");
const prisma_1 = tslib_1.__importDefault(require("../utils/prisma"));
const getAllStudent = async (page, limit, sort = 'name', query, asc = true) => {
    const parsedLimit = limit ? parseInt(limit) : 5;
    const parsedPage = page ? parseInt(page) : 1;
    const students = await prisma_1.default.student.findMany({
        take: parsedLimit || 5,
        skip: (parsedPage ? parsedPage - 1 : 0) * (parsedLimit || 5),
        orderBy: {
            [sort]: asc ? "asc" : "desc",
        },
        where: {
            OR: [
                {
                    student_id: {
                        contains: query || "",
                        mode: "insensitive",
                    },
                },
                {
                    name: {
                        contains: query || "",
                        mode: "insensitive",
                    },
                },
            ],
        },
        include: {
            group: true
        }
    });
    return students;
};
exports.getAllStudent = getAllStudent;
const getStudentByID = async (student_id) => {
    const student = await prisma_1.default.student.findUnique({
        where: {
            student_id: student_id,
        },
    });
    return student;
};
exports.getStudentByID = getStudentByID;
const createStudent = async (name, student_id) => {
    const student = await prisma_1.default.student.create({
        data: {
            name: name,
            student_id: student_id,
        },
    });
    return student;
};
exports.createStudent = createStudent;
const updateStudent = async (name, student_id) => {
    const student = await prisma_1.default.student.update({
        where: {
            student_id: student_id,
        },
        data: {
            student_id: student_id,
            name: name,
        },
    });
    return student;
};
exports.updateStudent = updateStudent;
//# sourceMappingURL=student.service.js.map