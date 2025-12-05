import { responseSchema } from "../../../../../helpers/helperFunctions.js";

export const createTaskSchema = {
 headers: {
    type: "object",
    properties: {
      authorization: { type: "string" },
    },
    required: ["authorization"],
  },
  body: {
    type: "object",
    required: ["title","description","status","priority"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      status: { type: "string", enum: ["pending", "in-progress", "completed"], default: "pending" },
      priority: { type: "string", enum: ["low", "medium", "high"], default: "medium" }
    }
  },
 response: {
    201: responseSchema,
    400: responseSchema,
    401: responseSchema,
    500: responseSchema
  }
};


