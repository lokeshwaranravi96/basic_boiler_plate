import { responseSchema } from "../../../../../helpers/helperFunctions.js";

export const updateTaskSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" }
    }
  },
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      status: { type: "string", enum: ["pending", "in-progress", "done"] }
    }
  },
  response: {
      201: responseSchema,
      400: responseSchema,
      401: responseSchema,
      500: responseSchema
    }
};