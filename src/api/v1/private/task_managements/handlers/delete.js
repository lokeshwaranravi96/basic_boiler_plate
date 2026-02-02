
import { deleteTask } from "../../../../../interactors/task_managements/index.js";
import { saveTasksToFile, taskCache, tasks } from "../../../../../services/index.js";

export const deleteTaskHandler = async (req, reply) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id } = req.params;

    await deleteTask({id:Number(id)});

      return resolve({
        ...globalThis.status_codes.success,
        message: `Task with id ${id} deleted successfully!`,
      });
    } catch (error) {
      return reject(error);
    }
  });
}