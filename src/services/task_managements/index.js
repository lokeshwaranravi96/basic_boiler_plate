import { generateTaskId, saveTasksToFile, taskCache, tasks } from "../cache_file_datas/index.js";

/* -----------------------------------------
   Create Task
----------------------------------------- */
export  function createTaskService(options) {
  return new Promise((resolve, reject) => {
    try {

  const { title, description, status, priority } = options;
 
  // 3️⃣ Create task
  const newTask = {
    id: generateTaskId(),
    title,
    description,
    status,
    priority,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasksToFile();
  taskCache.set(newTask.id, newTask);

  return resolve({
    ...globalThis.status_codes.success,
    message: "Task created successfully",
    data: newTask,
  })
  
}
  catch (error) {
  console.log('createTaskService error:', error)
  return  reject(error);
  } });
}

/* -----------------------------------------
   Update Task
----------------------------------------- */
export  function updateTaskService(options) {
  return new Promise(async(resolve,reject)=>{
    try {

      const { id, title, description, status, priority } = options;
     
      const updatedTask = {
        id,
        title,
        description,
        status,
        priority,
        updated_at: new Date().toISOString(),
      };
    
      const index = tasks.findIndex(task => task.id === id);
     
      if (index === -1) {
        return reject({
          ...globalThis.status_codes.not_found,
          message: "Task not found",
        });
      }
    
     
       tasks[index] = {
         ...tasks[index],
         ...updatedTask,
         updated_at: new Date().toISOString(),
        };
        
      saveTasksToFile();
      taskCache.set(id, updatedTask);
    
      return resolve({
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
      });
    } catch (error) {
      console.log('updateTaskService error:', error)
      return reject(error);
    }
  })
}


