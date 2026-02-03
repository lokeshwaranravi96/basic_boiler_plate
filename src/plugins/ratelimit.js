import fp from "fastify-plugin";
import rateLimit from "@fastify/rate-limit";

//rate limiting to restrict clients to 100 requests per minute
export default fp(async (fastify) => {
  fastify.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
     allowList: ["127.0.0.1"], // allow local
  });
});
