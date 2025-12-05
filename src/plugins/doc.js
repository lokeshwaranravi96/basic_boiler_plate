import fp from "fastify-plugin";
import doc from "@scalar/fastify-api-reference";

export default fp(async (fastify) => {
  fastify.register(doc, {
    routePrefix: "/docs",
    configuration: {
      spec: {
        content: () => fastify.swagger(),
      },
    },
  });
});
