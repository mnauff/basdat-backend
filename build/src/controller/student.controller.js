"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentByStudentID = exports.getStudentByStudentID = exports.getStudent = exports.AddStudent = void 0;
const student_service_1 = require("../service/student.service");
const generateResponse_1 = require("../utils/generateResponse");
const AddStudent = async (req, res) => {
    try {
        const { name, student_id } = req.body;
        if (!name || !student_id) {
            res
                .status(400)
                .json((0, generateResponse_1.error)(400, 'BAD_REQUEST', ['name is required', 'student_id is required']));
        }
        const existingStudent = await (0, student_service_1.getStudentByID)(student_id);
        if (existingStudent) {
            res.status(400).json((0, generateResponse_1.error)(400, 'BAD_REQUEST', ['Student is already existed']));
        }
        const student = await (0, student_service_1.createStudent)(name, student_id);
        res.status(200).json((0, generateResponse_1.success)(200, 'OK', { student }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.AddStudent = AddStudent;
const getStudent = async (req, res) => {
    try {
        const { page, search, limit, sort, asc } = req.query;
        const students = await (0, student_service_1.getAllStudent)(page?.toString(), limit?.toString(), sort?.toString(), search?.toString(), asc ? asc === 'true' : undefined);
        res.status(200).json((0, generateResponse_1.success)(200, 'OK', { students }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.getStudent = getStudent;
const getStudentByStudentID = async (req, res) => {
    try {
        const { student_id } = req.params;
        console.log(student_id);
        const student = await (0, student_service_1.getStudentByID)(student_id);
        if (!student || !student_id) {
            res.status(404).json((0, generateResponse_1.error)(404, 'NOT_FOUND', ['Student is not found!']));
        }
        res.status(200).json((0, generateResponse_1.success)(200, 'OK', { student }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.getStudentByStudentID = getStudentByStudentID;
const updateStudentByStudentID = async (req, res) => {
    try {
        const { name, student_id } = req.body;
        const student = await (0, student_service_1.getStudentByID)(student_id);
        if (!student || !student_id) {
            res.status(404).json((0, generateResponse_1.error)(404, 'NOT_FOUND', ['Student is not found!']));
        }
        const newStudent = await (0, student_service_1.updateStudent)(name, student_id);
        res.status(200).json((0, generateResponse_1.success)(200, 'OK', { newStudent }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateStudentByStudentID = updateStudentByStudentID;
//# sourceMappingURL=student.controller.js.map