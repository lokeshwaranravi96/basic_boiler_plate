
export const deleteTaskHandler = async (req, reply) => {
  const { id } = req.params;

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return reply.code(404).send({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  return { message: "Task deleted successfully" };
};