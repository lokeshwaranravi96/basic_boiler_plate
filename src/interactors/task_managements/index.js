import { checkCacheForDuplicate, checkFileForDuplicate, createTaskService, existsInCache, existsInFile,  taskCache,  updateTaskService,tasks, saveTasksToFile } from "../../services/index.js";


export const createTask = async (options) => {
  return new Promise(async(resolve,reject)=>{
    try {
const { title } = options;
 
      
        // 1️⃣ Check cache
        if (existsInCache('title',title)) {
        return  reject({
            ...globalThis.status_codes.Conflict,
            message: "Task already exists (cache)",
          })
        
        }
      
        // 2️⃣ Check file
        if (existsInFile('title',title)) {
          return reject({
            ...globalThis.status_codes.Conflict,
            message: "Task already exists (file)",
          });
        }

      const result = await createTaskService(options);
   return   resolve(result);
    } catch (error) {
    console.log('createTask interactors error:', error)
   return  reject(error);
    }
  })
};


export const updateTask = async (options) => {
  return new Promise(async(resolve,reject)=>{
    try {
const {id, title } = options;

      // 1️⃣ Check existence in cache or file
await  checkCacheForDuplicate(title,Number(id)) 
await checkFileForDuplicate(title,Number(id));

      const result = await updateTaskService({...options,id:Number(id)});
  
      return resolve({
        ...globalThis.status_codes.success,
        message: "Task updated successfully",
        data: result,
      });                  

    } catch (error) {
    console.log('updateTask interactors error:', error)
   return  reject(error);
    }
  })
};


export const findAllTask=async(options)=>{
  return new Promise((resolve,reject)=>{
    try {
      const {offset, limit,search} = options;

        const keys = taskCache.keys();
            console.log('keys:', keys)
            const taskCacheData = keys.map(key => taskCache.get(key))
          
       let result = taskCacheData;

  // 1️⃣ Search
  if (search) {
    const keyword = search.toLowerCase();
    result = result.filter(task =>
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword)
    );
  }

  // 2️⃣ Offset + Limit (pagination)
  result = result.slice(offset, offset + limit);

  if(result.length!==limit){

   // 5️⃣ Find missing count
  const remaining = limit - result?.length;

  // 6️⃣ Exclude already fetched IDs
  const existingIds = new Set(result?.map(t => t?.id));

  // 7️⃣ Get from file (JSON)
  let fileTasks = tasks
  .filter(t => !existingIds?.has(t.id));
  
  // 8️⃣ Apply search on file.
  
  if (search) {
   const keyword = search?.toLowerCase();
    fileTasks = fileTasks.filter(t =>
      t.title.toLowerCase().includes(keyword) ||
      t.description.toLowerCase().includes(keyword)
    );
  }

  // 9️⃣ Apply offset only if cache had zero items
  const fileOffset = result.length === 0 ? offset : 0;

  // 🔟 Take only required remaining items
  fileTasks = fileTasks.slice(fileOffset, fileOffset + remaining);
  }

      return resolve({
        ...globalThis.status_codes.success,
        message: "Tasks fetched successfully",
        data: result,
      });
    } catch (error) {
      return reject(error);
    } })
}

export const deleteTask=async(options)=>{
  return new Promise((resolve,reject)=>{
    try {
      const {id} = options;
       // Check in cache
      let task = taskCache.get(id);
      if (!task) {
        // Check in file/memory
        task = tasks.find(t => t.id === parseInt(id));
        if (!task) {
          return reject({
            ...globalThis.status_codes.not_found,
            message: "Task not found",
          });
        }
      }

      // Remove from memory
      const index = tasks.findIndex(t => t.id === parseInt(id));
      if (index !== -1) {
        tasks.splice(index, 1);
      }

      // Save to file
      saveTasksToFile();

      // Delete from cache
      taskCache.del(id);
  return resolve(true);
    } catch (error) {
      return reject(error);
    } })
};