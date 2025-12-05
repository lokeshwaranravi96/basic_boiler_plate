import * as handler from "./handlers/index.js";
import * as schema from "./schema/index.js";
import {authMiddleware}  from "../../../../middlewares/index.js";

export default async function taskManagements(fastify, opts) {

     /**
   * -----------------------
   *  JWT Middleware
   * -----------------------
   */
  fastify.addHook("preHandler", authMiddleware);
  
  // CREATE
  fastify.post("/tasks", {
    schema: schema.createTaskSchema},
        handler.createTaskHandler
  );

  // LIST ALL
  fastify.get("/tasks", {
    schema: schema.listTasksSchema},
    handler.listTasksHandler
  );

  // GET BY ID
  fastify.get("/tasks/:id", {
    schema: schema.getTaskSchema},
    handler.getTaskHandler
  );

  // UPDATE
  fastify.put("/tasks/:id", {
    schema: schema.updateTaskSchema},
    handler.updateTaskHandler
  );

  // DELETE
  fastify.delete("/tasks/:id", {
    schema: schema.deleteTaskSchema},
    handler.deleteTaskHandler
  );
}
