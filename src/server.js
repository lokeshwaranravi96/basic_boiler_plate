import Fastify from "fastify";
import app from "./app.js";

const server = Fastify({ logger: true });

const start = async () => {
  await server.register(app);
  await server.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
};
start();