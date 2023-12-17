"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV !== 'production') {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new client_1.PrismaClient();
    }
    prisma = global.cachedPrisma;
}
else {
    prisma = new client_1.PrismaClient();
}
exports.default = prisma;
//# sourceMappingURL=prisma.js.map