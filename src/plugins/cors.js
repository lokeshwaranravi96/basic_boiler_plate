import cors from "@fastify/cors";

export default async function (fastify, opts) {
  await fastify.register(cors, {
    origin: "*", // ⚠️ change in prod
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
}
