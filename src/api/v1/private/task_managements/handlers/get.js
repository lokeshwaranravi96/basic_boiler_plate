import fs from "fs";
import path from "path";

const tasks = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/helpers/sample_data.json'), 'utf8'));

export const listTasksHandler = async (req, reply) => {
  return tasks;
};

export const getTaskHandler = async (req, reply) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return reply.code(404).send({ message: "Task not found" });
  }

  return task;
};