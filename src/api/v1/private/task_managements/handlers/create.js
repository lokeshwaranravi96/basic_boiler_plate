// import { MESSAGES } from "../../../../../helpers/constant.js";
// import { send, STATUS } from "../../../../../helpers/helperFunctions.js";
import { createTask } from "../../../../../interactors/task_managements/index.js";

export const createTaskHandler = async (req, reply) => {
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
      
      } else {
        // return send(reply, STATUS.ERROR, result.message || MESSAGES.SERVER.ERROR);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      // return send(reply, STATUS.ERROR, MESSAGES.SERVER.ERROR);
    }
  })
};
