/* eslint-disable @typescript-eslint/no-explicit-any */

  interface HttpStatus {
    [key: string]: {
      code: number;
      status: string;
    };
  }
  
  export const HttpStatus: HttpStatus = {
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
  
  export const success = (status: number, message: string, data: any = null) => {
    return {
      response: {
        status,
        message,
      },
      data,
    };
  };
  
  export const errors = (status: number, message: string, error: any = null) => {
    return {
      response: {
        status,
        message,
      },
      error,
    };
  };
  