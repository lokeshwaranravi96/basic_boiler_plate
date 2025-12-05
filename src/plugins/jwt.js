import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

const authorizationMessages = {
  badRequestErrorMessage: `Format must be Authorization: Bearer <token>`,
  noAuthorizationInHeaderMessage: "Authorization header is missing!",
  authorizationTokenExpiredMessage: "Token expired!",
  authorizationTokenInvalid: (err) =>
    `Authorization token is invalid: ${err.message}`,
};

const jwtPlugin = async (fastify) => {
  // Register JWT plugin
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    messages: authorizationMessages,
    sign: { expiresIn: "365d", key: process.env.JWT_SECRET },
  });

  // Common authentication function
  const commonAuthenticate = async (request, reply) => {
    try {
      if (request?.headers?.authorization) {
        await request.jwtVerify();
    /// add the logic to check user is active or blocked

       
      } else {
        reply.code(401).send("UnAuth User");
      }
    } catch (err) {
      reply.code(401).send(err.message);
    }
  };

  // Decorate Fastify instance with authentication method
  fastify.decorate("authenticate", (request, reply) =>
    commonAuthenticate(request, reply)
  );

  // Optional: Remove this if you don't need publicauthenticate
  fastify.decorate("publicauthenticate", (request, reply) =>
    commonAuthenticate(request, reply)
  );
};

export default fp(jwtPlugin);
