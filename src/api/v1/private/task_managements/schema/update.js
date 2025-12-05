
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
  }
};