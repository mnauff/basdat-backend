"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assistant = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const assistant_controller_1 = require("../controller/assistant.controller");
const router = express_1.default.Router();
exports.assistant = router;
router.post('/', assistant_controller_1.addAssistant);
//# sourceMappingURL=assistant.js.map