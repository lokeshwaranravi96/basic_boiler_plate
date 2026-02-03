import fp from "fastify-plugin";
import sensible from "@fastify/sensible";

// standard HTTP error and utility helpers globally to the application.
export default fp(async (fastify) => {
  fastify.register(sensible);
});
