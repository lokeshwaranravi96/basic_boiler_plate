import { taskCache, tasks } from "../../../../../services/index.js";

export const getTaskHandler = async (req, reply) => {
  return new Promise((resolve,reject)=>{
    try {
      
      const { id } = req.params;
      let task = taskCache.get(id);

      if (!task) {
        console.log('Fetching from file as not in cache');
     task=   tasks.find(t => t?.id === parseInt(id));
     if(!task){
       return reject({
         ...globalThis.status_codes.not_found,
         message: "Task not found",
        });
      }}
      taskCache.set(task.id, task);

      return resolve({
        ...globalThis.status_codes.success,
        message: "Task fetched successfully",
        data:task
      });
    } catch (error) {
      return reject(error);
    }
  })
};