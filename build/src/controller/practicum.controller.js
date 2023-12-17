"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPracticum = exports.AddPracticum = void 0;
const generateResponse_1 = require("../utils/generateResponse");
const practicum_service_1 = require("../service/practicum.service");
const AddPracticum = async (req, res) => {
    try {
        const { practicum_name, place, start_date, end_date } = req.body;
        if (!practicum_name || !place || !start_date || !end_date) {
            res
                .status(400)
                .json((0, generateResponse_1.error)(400, 'BAD_REQUEST', ['practicum_name is required', 'place is required', 'start_date is required', 'end_date is required']));
        }
        const practicum = await (0, practicum_service_1.createPracticum)(practicum_name, place, start_date, end_date);
        res.status(200).json((0, generateResponse_1.success)(200, 'OK', { practicum }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.AddPracticum = AddPracticum;
const getAllPracticum = async (req, res) => {
    try {
        const { page, search, limit, sort, asc } = req.query;
        const students = await (0, practicum_service_1.getPracticum)(page?.toString(), limit?.toString(), sort?.toString(), search?.toString(), asc ? asc === 'true' : undefined);
        res.status(200).json((0, generateResponse_1.success)(200, 'OK', { students }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAllPracticum = getAllPracticum;
//# sourceMappingURL=practicum.controller.js.map