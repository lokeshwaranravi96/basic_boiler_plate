import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  fastify.register(cors, {
    origin: "*", // Allow all origins (development only)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies / Authorization header
  });
});
