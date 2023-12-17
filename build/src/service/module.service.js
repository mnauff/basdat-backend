"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
const tslib_1 = require("tslib");
const prisma_1 = tslib_1.__importDefault(require("../utils/prisma"));
const createModule = async (module_name, practicum_id, date) => {
    const practicum = await prisma_1.default.module.create({
        data: {
            module_name: module_name,
            practicum_id: practicum_id,
            date: date,
        },
        include: {
            group: true,
            practicum: true,
        },
    });
    return practicum;
};
exports.createModule = createModule;
//# sourceMappingURL=module.service.js.map