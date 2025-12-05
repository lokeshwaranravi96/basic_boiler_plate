import fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import underPressure from "@fastify/under-pressure";
import fastifyJwt from "@fastify/jwt";
import dotenv from "dotenv";

import taskManagements from "./api/v1/private/task_managements/index.js";

const app = fastify({ logger: true });

// Load env variables
dotenv.config();

const startServer = async () => {
  try {

// Load JWT secret
await app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

     /**
     * -------------------------
     *  Swagger Documentation
     * -------------------------
     */
    await app.register(fastifySwagger, {
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

    await app.register(fastifySwaggerUI, {
      routePrefix: "/docs",
      uiConfig: {
        docExpansion: "none",
        deepLinking: false,
      },
    });

    // 1. Security headers
    await app.register(helmet);

    // 2. CORS (restrict in production)
    await app.register(cors, {
      origin: "*", // ⚠️ change in prod
      methods: ["GET", "POST", "PUT", "DELETE"],
    });

    // 3. Rate limiting (anti-DDOS / brute-force protection)
    await app.register(rateLimit, {
      max: 100, // max requests per minute
      timeWindow: "1 minute",
      allowList: ["127.0.0.1"], // allow local
    });

 // Protect CPU, Event Loop, Memory
    await app.register(underPressure, {
      maxEventLoopDelay: 1000,
      maxEventLoopUtilization: 0.98,
    });
   
  /**
     * -----------------------
     *  ROUTES
     * -----------------------
     */
    await app.register(taskManagements, { prefix: "/api/v1/task_managements" });

    /**
     * -----------------------
     *  BLOCK NON-ALLOWED HTTP METHODS (OPTIONAL)
     * -----------------------
     */
    app.addHook("onRequest", (req, reply, done) => {
      const allowed = ["GET", "POST", "PUT", "DELETE", "OPTIONS"];
      if (!allowed.includes(req.method)) {
        reply.code(405).send({ message: "Method Not Allowed" });
      }
      done();
    });

    // Start server
    await app.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    app.log.info("Server listening on port 3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
