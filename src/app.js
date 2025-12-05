// ...existing code...
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import AutoLoad from "@fastify/autoload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const options = {};

export default async function app(fastify, opts) {
  // Load plugins
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // Load routes (fixed relative path and extension)
  const v1Routes = (await import("./api/v1/index.js")).default;
  fastify.register(v1Routes, { prefix: "/api/v1" });
}
// ...existing code...