import { updateTask } from "../../../../../interactors/task_managements/index.js";

export const updateTaskHandler = async (req, reply) => {
  return new Promise(async  (resolve,reject)=>{
    try {
      const { id } = req.params;
    
   const result = await  updateTask({...req.body, id})
      console.log('result:', result)
      return resolve(result);
    } catch (error) {
      console.log('updateTaskHandler error:', error)
      return reject(error);
    }
  })
};