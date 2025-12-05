import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const swaggerPlugin = async (fastify, options) => {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: "Project Name APIS",
        description: "API documentation",
        version: "1.0.0",
      },
    },
    exposeRoute: true,
  });

  fastify.register(fastifySwaggerUi, {
    routePrefix: "/",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => swaggerObject,
    transformSpecificationClone: true,
  });
};

export default fp(swaggerPlugin);
