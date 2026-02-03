import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async function (fastify, opts) {
  await fastify.register(cors, {
    origin: "*", // ⚠️ change in prod
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
});
