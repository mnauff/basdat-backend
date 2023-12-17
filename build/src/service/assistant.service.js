"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssistant = void 0;
const tslib_1 = require("tslib");
const prisma_1 = tslib_1.__importDefault(require("../utils/prisma"));
const createAssistant = async (assistant_name, assistant_id, practicum_id) => {
    const student = await prisma_1.default.assistant.create({
        data: {
            assistant_name: assistant_name,
            assistant_id: assistant_id,
            practicum_id: practicum_id
        },
        include: {
            practicum: true
        }
    });
    return student;
};
exports.createAssistant = createAssistant;
//# sourceMappingURL=assistant.service.js.map