import { taskManagementServices } from "../../services/index.js";


export const createTask = async (options) => {
  return taskManagementServices.createTask(options);
};
