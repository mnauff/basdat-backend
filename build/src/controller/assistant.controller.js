"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAssistant = void 0;
const assistant_service_1 = require("./../service/assistant.service");
const generateResponse_1 = require("../utils/generateResponse");
const addAssistant = async (req, res) => {
    try {
        const { assistant_name, assistant_id, practicum_id } = req.body;
        const newAssistant = await (0, assistant_service_1.createAssistant)(assistant_name, assistant_id, practicum_id);
        res.status(200).json((0, generateResponse_1.success)(200, 'OK', { newAssistant }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.addAssistant = addAssistant;
//# sourceMappingURL=assistant.controller.js.map