"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = exports.HttpStatus = void 0;
exports.HttpStatus = {
    OK: {
        code: 200,
        status: 'OK',
    },
    CREATED: {
        code: 201,
        status: 'CREATED',
    },
    NO_CONTENT: {
        code: 204,
        status: 'NO_CONTENT',
    },
    UNAUTHORIZED: {
        code: 401,
        status: 'UNAUTHORIZED',
    },
    BAD_REQUEST: {
        code: 400,
        status: 'BAD_REQUEST',
    },
    NOT_FOUND: {
        code: 404,
        status: 'NOT_FOUND',
    },
    CONFLICT: {
        code: 409,
        status: 'CONFLICT',
    },
    INTERNAL_SERVER_ERROR: {
        code: 500,
        status: 'INTERNAL_SERVER_ERROR',
    },
};
const success = (status, message, data = null) => {
    return {
        response: {
            status,
            message,
        },
        data,
    };
};
exports.success = success;
const error = (status, message, error = null) => {
    return {
        response: {
            status,
            message,
        },
        error,
    };
};
exports.error = error;
//# sourceMappingURL=generateResponse.js.map