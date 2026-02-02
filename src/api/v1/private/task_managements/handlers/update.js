import fs from "fs";
import path from "path";

const tasks = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/helpers/sample_data.json'), 'utf8'));

export const updateTaskHandler = async (req, reply) => {
  const { id } = req.params;
  const updates = req.body;

  let task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return reply.code(404).send({ message: "Task not found" });
  }

  Object.assign(task, updates);

  return task;
};