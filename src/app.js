import fastify from "fastify";
import dotenv from "dotenv";
import AutoLoad from "@fastify/autoload";
import path from "path";
import { fileURLToPath } from "url";
import { giveMeStatusCodes } from "./helpers/helperFunctions.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify({ logger: true });

// Set it globally once at app startup
globalThis.status_codes = giveMeStatusCodes();

const startServer = async () => {
  try {

    // 🔥 AUTO LOAD PLUGINS
    await app.register(AutoLoad, {
      dir: path.join(__dirname, "plugins"),
    });

    // 🔥 AUTO LOAD ROUTES (public + private)
    await app.register(AutoLoad, {
      dir: path.join(__dirname, "api", "v1"),
      options: { prefix: "/api/v1" },
    });

// ❌ Block URLs containing /public/ or /private/
    app.addHook("onRequest", (req, reply, done) => {
      if (req.url.includes("/public/") || req.url.includes("/private/")) {
        reply.code(404).send({ message: "Route not found" });
        return;
      }
      done();
    });

    app.addHook("onRequest", (req, reply, done) => {
      const allowed = ["GET", "POST", "PUT", "DELETE", "OPTIONS"];
      if (!allowed.includes(req.method)) {
        reply.code(405).send({ message: "Method Not Allowed" });
      }
      done();
    });

    await app.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    console.log("Server is running on port", process.env.PORT || 3000); 
    app.log.info("Server running 🚀");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
