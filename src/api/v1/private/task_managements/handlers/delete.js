import fs from "fs";
import path from "path";

const tasks = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/helpers/sample_data.json'), 'utf8'));

export const deleteTaskHandler = async (req, reply) => {
  const { id } = req.params;

  const index = tasks.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return reply.code(404).send({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  return { message: "Task deleted successfully" };
};