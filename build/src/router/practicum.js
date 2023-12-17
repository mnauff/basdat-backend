"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.practicum = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const practicum_controller_1 = require("../controller/practicum.controller");
const router = express_1.default.Router();
exports.practicum = router;
router.post('/', practicum_controller_1.AddPracticum);
router.get('/', practicum_controller_1.getAllPracticum);
//# sourceMappingURL=practicum.js.map