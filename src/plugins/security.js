import underPressure from "@fastify/under-pressure";

export default async function (fastify, opts) {
 
 // @fastify/under-pressure monitors system load and automatically returns 503 
 // when the Fastify server is under heavy pressure to prevent crashes.
 
  // Protect CPU, Event Loop, Memory
  await fastify.register(underPressure, {
    maxEventLoopDelay: 1000,
    maxEventLoopUtilization: 0.98,
  });
}