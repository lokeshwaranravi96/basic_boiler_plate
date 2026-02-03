import { taskManagementServices } from "../../services/index.js";


export const createTask = async (options) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await taskManagementServices.create(options);
    return  resolve(result);
    } catch (error) {
    return  reject(error);
    }
  });
};
