import { responseSchema } from "../../../../../helpers/helperFunctions.js";

export const createSchema = {
  description: "Create a new task",
  tags: ["Task Management"],
  summary: "Endpoint to create a new task",

  headers: {
    type: "object",
    required: ["authorization"],
    properties: {
      authorization: {
        type: "string",
        description: "Bearer token"
      }
    }
  },

  body: {
    type: "object",
    required: ["title", "description", "status", "priority"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      status: {
        type: "string",
        enum: ["pending", "in-progress", "completed"]
      },
      priority: {
        type: "string",
        enum: ["low", "medium", "high"]
      }
    }
  },

  response: {
    201: responseSchema,
    400: responseSchema,
    401: responseSchema,
    500: responseSchema
  }
};
