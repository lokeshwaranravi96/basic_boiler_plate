
export const listTasksHandler = async (req, reply) => {
  return tasks;
};

export const getTaskHandler = async (req, reply) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return reply.code(404).send({ message: "Task not found" });
  }

  return task;
};