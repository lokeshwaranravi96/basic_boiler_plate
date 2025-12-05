import fs from "fs";
import path from "path";
import NodeCache from "node-cache";

const filePath = path.join(process.cwd(), "./src/helpers/sample_data.json");

// Cache with 0 TTL = store permanently until restart
const taskCache = new NodeCache({ stdTTL: 0 });

class TaskManagements {
  constructor() {
    this.tasks = this.loadTasksFromFile();
    this.loadInitialCache(); // Load JSON data into cache on startup
  }

  // -----------------------------------------
  // Load tasks from JSON file
  // -----------------------------------------
  loadTasksFromFile() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(data);

    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error("Error loading tasks:", err);
    return [];
  }
}


  // -----------------------------------------
  // Save tasks to JSON file
  // -----------------------------------------
  saveTasksToFile() {
    fs.writeFileSync(filePath, JSON.stringify(this.tasks, null, 2));
  }

  // -----------------------------------------
  // Load initial cache from file on startup
  // -----------------------------------------
  loadInitialCache() {
  if (!Array.isArray(this.tasks)) {
    console.error("Tasks is not an array, resetting to []");
    this.tasks = [];
  }

  this.tasks.forEach((task) => {
    taskCache.set(task.title.toLowerCase(), task);
  });
}


  // -----------------------------------------
  // Check duplicate in Node Cache
  // -----------------------------------------
  existsInCache(title) {
    return taskCache.has(title);
  }

  // -----------------------------------------
  // Check duplicate in JSON file
  // -----------------------------------------
  existsInFile(title) {
    return this.tasks.some(
     (task) => `task.${title}` === title
    );
  }

  // -----------------------------------------
  // Generate new ID
  // -----------------------------------------
  generateTaskId() {
    return this.tasks.length
      ? this.tasks[this.tasks.length - 1].id + 1
      : 1;
  }

  // -----------------------------------------
  // Create Task (Cache → File → Insert)
  // -----------------------------------------
  async createTask(options) {
    const { title, description, status, priority } = options;
    const key = title;

    // 1️⃣ Check Node-Cache first
    if (this.existsInCache(title)) {
      return {
        success: false,
        code: 409,
        message: "Task already exists (cache)",
      };
    }

    // 2️⃣ Check JSON file second
    if (this.existsInFile(title)) {
      return {
        success: false,
        code: 409,
        message: "Task already exists (file)",
      };
    }

    // 3️⃣ Create new task
    const newTask = {
      id: this.generateTaskId(),
      title,
      description,
      status,
      priority,
    //   assigned_to:
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Add to file memory
    this.tasks.push(newTask);
    this.saveTasksToFile();

    // Add to Node Cache
    taskCache.set(key, newTask);

    return {
      success: true,
      message: "Task created successfully",
      data: newTask,
    };
  }

   async updateTask(options) {
    const { id,title, description, status, priority } = options;
    const key = title;

    // 1️⃣ Check Node-Cache first
    if (this.existsInCache(id)) {
      return {
        success: false,
        code: 409,
        message: "Task already exists (cache)",
      };
    }

    // 2️⃣ Check JSON file second
    if (this.existsInFile(id)) {
      return {
        success: false,
        code: 409,
        message: "Task already exists (file)",
      };
    }

    // 3️⃣ Update new task
    const newTask = {
      id: this.generateTaskId(),
      title,
      description,
      status,
      priority,
    //   assigned_to:
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Add to file memory
    this.tasks.push(newTask);
    this.saveTasksToFile();

    // Add to Node Cache
    taskCache.set(key, newTask);

    return {
      success: true,
      message: "Task created successfully",
      data: newTask,
    };
  }
}

export const taskManagementServices = new TaskManagements();
