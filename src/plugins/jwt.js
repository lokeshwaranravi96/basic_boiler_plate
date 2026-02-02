import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

const authorizationMessages = {
  badRequestErrorMessage: "Format must be Authorization: Bearer <token>",
  noAuthorizationInHeaderMessage: "Authorization header is missing!",
  authorizationTokenExpiredMessage: "Token expired!",
  authorizationTokenInvalid: (err) =>
    `Authorization token is invalid: ${err.message}`,
};

const jwtPlugin = async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    messages: authorizationMessages,
    sign: {
      expiresIn: "365d",
      key: process.env.JWT_SECRET,
    },
  });

  const commonAuthenticate = async (request, reply) => {
    try {
      const authHeader = request.headers?.authorization;

      if (!authHeader) {
        reply.code(401).send("UnAuth User");
        return;
      }

      await request.jwtVerify();

      // Removed user_profile check as models are not available
    } catch (err) {
      reply.code(401).send(err.message);
    }
  };

  fastify.decorate("authenticate", async (request, reply) => {
    await commonAuthenticate(request, reply);
  });

  fastify.decorate("publicauthenticate", async (request, reply) => {
    await commonAuthenticate(request, reply);
  });
};

export default fp(jwtPlugin);
