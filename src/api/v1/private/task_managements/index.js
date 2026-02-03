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
    schema: schema.createSchema},
        handler.createHandler
  );

}
