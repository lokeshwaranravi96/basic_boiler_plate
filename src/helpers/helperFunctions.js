// utils/response.js

const statusCodes = {
  success: { status: 200, api_status: "API-OK" },
  no_data: { status: 204, api_status: "API-OK-NO-CONTENT" },
  bad_request: { status: 400, api_status: "API-BAD-REQUEST" },
  unauthorized: { status: 401, api_status: "API-UNAUTHORIZED" },
  forbidden: { status: 403, api_status: "API-FORBIDDEN" },
  not_found: { status: 404, api_status: "API-NOT-FOUND" },
  conflict: { status: 409, api_status: "API-CONFLICT" },
  error: { status: 500, api_status: "API-ERROR" },
};

// Clean, easy function
export const send = (reply, type, message = "", data = null) => {
  const code = statusCodes[type] || statusCodes.error;

  return reply.code(code.status).send({
    api_status: code.api_status,
    message,
    data,
  });
};




export const STATUS = {
  SUCCESS: "success",
  NO_DATA: "no_data",
  BAD_REQUEST: "bad_request",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  NOT_FOUND: "not_found",
  SERVER_ERROR: "server_error",
};


// Generic response schema
export const responseSchema = {
  type: "object",
  properties: {
    api_status: { type: "string", description: "Status code string, e.g., API-OK, API-ERROR" },
    message: { type: "string", description: "Human-readable message" },
    data: {
      oneOf: [
        { type: "object" },
        { type: "array" },
        { type: "null" }
      ],
      description: "Response payload, can be object, array or null"
    }
  },
  // required: ["api_status", "message", "data"]
};
