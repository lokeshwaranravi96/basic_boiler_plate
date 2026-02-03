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

// 🌍 Set global constants once
globalThis.status_codes = giveMeStatusCodes();

const startServer = async () => {
  try {
    /**
     * 🔥 AUTO LOAD PLUGINS
     * (Swagger must be loaded BEFORE routes)
     */
    await app.register(AutoLoad, {
      dir: path.join(__dirname, "plugins"),
    });

    /**
     * 🔥 AUTO LOAD ROUTES
     */
    await app.register(AutoLoad, {
      dir: path.join(__dirname, "api", "v1"),
      options: { prefix: "/api/v1" },
    });

    
   
   /**
     * 🚫 BLOCK /public/ and /private/
     * 🚫 BLOCK UNALLOWED HTTP METHODS
     * ✅ Allow Swagger routes
     */
    app.addHook("onRequest", (req, reply, done) => {

        if (req.url.includes("/public/") || req.url.includes("/private/")) {
        reply.code(404).send({ message: "Route not found" });
        return;
      }

      if (
        req.url.startsWith("/docs") ||
        req.url.startsWith("/documentation")
      ) {
        return done(); // allow swagger
      }

      const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
      if (!allowedMethods.includes(req.method)) {
        reply.code(405).send({ message: "Method Not Allowed" });
        return;
      }

      done();
    });

    /**
     * 🚀 START SERVER
     */
    await app.listen({
      port: process.env.PORT || 3000,
      host: "0.0.0.0",
    });

    app.log.info("🚀 Server running successfully");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
