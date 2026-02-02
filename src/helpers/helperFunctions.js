// helper/statusCodes.js

export const giveMeStatusCodes = () => {
  return {
    success: { status: 200, api_status: "API-OK" },
    success_no_data: { status: 204, api_status: "API-OK-NO-CONTENT" },
    bad_request: { status: 400, api_status: "API-BAD-REQUEST" },
    un_authorised: { status: 401, api_status: "API-UN-AUTHORISED-ACCESS" },
    forbidden: { status: 403, api_status: "API-FORBIDDEN" },
    not_found: { status: 404, api_status: "API-NOT-FOUND" },
    Conflict: { status: 409, api_status: "API-CONFLICT" },
    error: { status: 500, api_status: "API-ERROR" },
  };
};


export const responseSchema = {
  type: "object",
  properties: { api_status: { type: "string", description: "Status code string, e.g., API-OK, API-ERROR" },
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
