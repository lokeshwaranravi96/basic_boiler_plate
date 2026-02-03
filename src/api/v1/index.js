import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadRoutes(app, baseDir, hideFromSwagger = false) {
  const modules = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const moduleName of modules) {
    const routePath = path.join(baseDir, moduleName, "index.js");
    if (!fs.existsSync(routePath)) continue;

    const route = await import(pathToFileURL(routePath).href);

    await app.register(
      async function (instance) {
        // 🔥 Hide ONLY when explicitly asked (private)
        if (hideFromSwagger) {
          instance.addHook("onRoute", (routeOptions) => {
            routeOptions.schema = {
              ...(routeOptions.schema || {}),
              hide: true
            };
          });
        }

        await instance.register(route.default);
      },
      {
        // ✅ clean URL (no public/private)
        prefix: `/${moduleName}`
      }
    );
  }
}

export default async function routes(app) {
  // ✅ PUBLIC → SHOW in Swagger
  await loadRoutes(app, path.join(__dirname, "public"), true);

  // ❌ PRIVATE → HIDE from Swagger
  await loadRoutes(app, path.join(__dirname, "private"), true);
}
