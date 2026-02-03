import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

export default fp(async function (fastify) {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Task Management API",
        description: "API documentation for Task Management System",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
  });

  await fastify.register(fastifySwaggerUI, {
    routePrefix: "/docs",
    exposeRoute: true,
  });
})
