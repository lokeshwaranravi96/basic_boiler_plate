import { fastifyMultipart } from "@fastify/multipart";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.register(fastifyMultipart, {
    attachFieldsToBody: true,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50 MB in bytes
    },
  });
});
