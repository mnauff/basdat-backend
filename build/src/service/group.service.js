"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = void 0;
const tslib_1 = require("tslib");
const prisma_1 = tslib_1.__importDefault(require("../utils/prisma"));
const createGroup = async (student_id, practicum_id) => {
    const group = await prisma_1.default.group.create({
        data: {
            practicum_id: practicum_id,
            student: {
                connect: student_id.map((studentId) => ({ student_id: studentId })),
            }
        },
        include: {
            student: true,
            practicum: true
        },
    });
    return group;
};
exports.createGroup = createGroup;
//# sourceMappingURL=group.service.js.map