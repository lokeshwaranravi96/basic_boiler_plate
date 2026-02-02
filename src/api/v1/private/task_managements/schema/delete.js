import { responseSchema } from "../../../../../helpers/helperFunctions.js";

export const deleteTaskSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" }
    }
  },response: {
      200:responseSchema,
        400: responseSchema,
        401: responseSchema,
        404: responseSchema,
        500: responseSchema
    }
};
