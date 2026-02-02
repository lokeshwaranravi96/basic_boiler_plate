import { createTask } from "../../../../../interactors/task_managements/index.js";

export const createTaskHandler = async (req, reply) => {
  return new Promise(async(resolve,reject)=>{
    try {
      // ✅ Get user info from decoded JWT
      const user = req.user;
  
      const { title, description, status, priority } = req.body;
  
      // Call the interactor to create a task
      const result = await createTask({ title, description, status, priority });
  
      if (result && result.data) {
        return resolve({
          data:result.data,
           ...globalThis.status_codes.success, // spread global status code
            message: "Task created successfully!",
        })
      
      }
    } catch (error) {
      console.log('createTaskHandler error:==>', error)
      return reject(error);
    }
  })
};
