import underPressure from "@fastify/under-pressure";

export default async function (fastify, opts) {
 
  
  // Protect CPU, Event Loop, Memory
  await fastify.register(underPressure, {
    maxEventLoopDelay: 1000,
    maxEventLoopUtilization: 0.98,
  });
}