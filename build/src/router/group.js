"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.group = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const group_controller_1 = require("../controller/group.controller");
const router = express_1.default.Router();
exports.group = router;
router.post('/', group_controller_1.createGroups);
//# sourceMappingURL=group.js.map