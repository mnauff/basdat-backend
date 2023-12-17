"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const student_1 = require("./router/student");
const practicum_1 = require("./router/practicum");
const group_1 = require("./router/group");
const assistant_1 = require("./router/assistant");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use('/api/v1/student', student_1.student);
app.use('/api/v1/group', group_1.group);
app.use('/api/v1/practicum', practicum_1.practicum);
app.use('/api/v1/assistant', assistant_1.assistant);
const server = http_1.default.createServer(app);
server.listen(8888);
//# sourceMappingURL=index.js.map