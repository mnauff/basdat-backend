"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroups = void 0;
const generateResponse_1 = require("../utils/generateResponse");
const group_service_1 = require("../service/group.service");
const createGroups = async (req, res) => {
    try {
        const { student_id, practicum_id } = req.body;
        const newGroup = await (0, group_service_1.createGroup)(student_id, practicum_id);
        res.status(200).json((0, generateResponse_1.success)(200, 'OK', { newGroup }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.createGroups = createGroups;
//# sourceMappingURL=group.controller.js.map