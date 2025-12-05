
export const updateTaskHandler = async (req, reply) => {
  const { id } = req.params;
  const updates = req.body;

  let task = tasks.find((t) => t.id === id);

  if (!task) {
    return reply.code(404).send({ message: "Task not found" });
  }

  task = Object.assign(task, updates);

  return task;
};