
import { createTask } from "../../../../../interactors/task_managements/index.js";

export const createHandler = async (req, reply) => {
  return new Promise(async(resolve,reject)=>{
    try {
      // ✅ Get user info from decoded JWT
      const user = req.user;
      console.log("Logged-in User:", user);
  
      const { title, description, status, priority } = req.body;
  
      // Call the interactor to create a task
      const result = await createTask({ title, description, status, priority });
  
      if (result.success) {

        return resolve({
          data:[],
           ...globalThis.status_codes.success, // spread global status code
            message: "Task created successfully!",
        })
      
      } 
    } catch (error) {
      console.error("Error creating task:", error);
      return reject(error)
    }
  })
};
