"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.student = void 0;
const tslib_1 = require("tslib");
const student_controller_1 = require("../controller/student.controller");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
exports.student = router;
router.post('/', student_controller_1.AddStudent);
router.get('/', student_controller_1.getStudent);
router.get('/:student_id', student_controller_1.getStudentByStudentID);
router.patch('/:student_id', student_controller_1.updateStudentByStudentID);
//# sourceMappingURL=student.js.map