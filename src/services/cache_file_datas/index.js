import fs from "fs";
import path from "path";
import NodeCache from "node-cache";

const filePath = path.join(process.cwd(), "./src/helpers/sample_data.json");

// Cache with 0 TTL = store permanently until restart
export const taskCache = new NodeCache({ stdTTL: 0 });

// Clear everything
// taskCache.flushAll();
// console.log("All cache cleared!",taskCache);
// In-memory tasks
export let tasks = [];

/* -----------------------------------------
   Load tasks from JSON file
----------------------------------------- */
export function loadTasksFromFile() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(data);
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error("Error loading tasks:", err);
    return [];
  }
}

/* -----------------------------------------
   Save tasks to JSON file
----------------------------------------- */
export function saveTasksToFile() {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

/* -----------------------------------------
   Load initial cache on startup
----------------------------------------- */
export function loadInitialCache() {
  if (!Array.isArray(tasks)) {
    console.error("Tasks is not an array, resetting to []");
    tasks = [];
  }

  tasks.forEach((task) => {
    taskCache.set(task.id, task);
  }); 
}

/* -----------------------------------------
   Cache existence check
----------------------------------------- */
export function existsInCache(key, value) {
  const tasks = taskCache.keys().map(k => taskCache.get(k));
  
  return tasks.some(task => task[key] === value);
}



/* -----------------------------------------
   File existence check
----------------------------------------- */
export function existsInFile(key, value) {
   return tasks.some((task) => task[key] === value);
}

// duplciate title check in cache
export function checkCacheForDuplicate(title, id) {
  return new Promise((resolve, reject) => {
    try {
      const keys = taskCache.keys();
      let taskExists = false;

      for (const key of keys) {
        const task = taskCache.get(key);
        if (!task) continue;

        if (task.id === id) {
          taskExists = true; // Task with this ID exists
        }

        if (task.title === title && task.id !== id) {
           return reject({
          ...globalThis.status_codes.Conflict,
          message: "Task with this title already exists",
        });
        }
      }

      if (!taskExists) {
        // Task with given ID does not exist
        return reject({
          ...globalThis.status_codes.not_found,
          message: "Task does not exist",
        });
      }

      // Task exists and no duplicate
      return resolve(true);
    } catch (error) {
      return reject(error);
    }
  });
}

/// check file for duplicate title
export function checkFileForDuplicate(title, id) {
  return new Promise((resolve, reject) => {
    try {
      // 1️⃣ Check if task with given ID exists
      const task = tasks.find((t) => t.id === id);

      if (!task) {
        return reject({
          ...globalThis.status_codes.not_found,
          message: "Task does not exist",
        });
      }

      // 2️⃣ Check for duplicate title in other tasks
      const duplicate = tasks.some(
        (t) => t.title === title && t.id !== id
      );

      if (duplicate) {
        return reject({
          ...globalThis.status_codes.Conflict,
          message: "Task with this title already exists",
        });
      }

      // 3️⃣ Task exists and no duplicate
      return resolve(true);
    } catch (error) {
      return reject(error);
    }
  });
}



/* -----------------------------------------
   Generate new ID
----------------------------------------- */
export function generateTaskId() {
  return tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
}



/* -----------------------------------------
   Initialize on startup
----------------------------------------- */
 tasks = loadTasksFromFile();
loadInitialCache();