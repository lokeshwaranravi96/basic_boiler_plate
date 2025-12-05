
export const getTaskSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" }
    }
  }
};


export const listTasksSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          status: { type: "string" }
        }
      }
    }
  }
};