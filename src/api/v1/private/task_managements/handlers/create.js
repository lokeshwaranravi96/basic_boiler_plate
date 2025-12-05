import { MESSAGES } from "../../../../../helpers/constant.js";
import { send, STATUS } from "../../../../../helpers/helperFunctions.js";
import { createTask } from "../../../../../interactors/task_managements/index.js";

export const createTaskHandler = async (req, reply) => {
  try {
        // ✅ Get user info from decoded JWT
    const user = req.user;   
    console.log("Logged-in User:", user);

    const { title, description, status, priority } = req.body;

    // Call the interactor to create a task
    const result = await createTask({ title, description, status, priority });

    if (!result.success) {
      

     return send(reply, STATUS.SUCCESS, MESSAGES.TASK.CREATED);
     

    }

    // Task created successfully
    return reply.code(201).send({
      success: true,
      message: result.message,
      data: result.data // Include the created task
    });

    //  return send(reply, STATUS.SUCCESS, MESSAGES.TASK.CREATED);

  } catch (error) {

     return send(reply, STATUS.ERROR, MESSAGES.SERVER.ERROR);

   
  }
};
