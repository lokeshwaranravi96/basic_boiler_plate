import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

// recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadRoutes(app, baseDir) {
  const folders = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const folder of folders) {
    const routePath = path.join(baseDir, folder, "index.js");
    if (fs.existsSync(routePath)) {
      const route = await import(pathToFileURL(routePath).href);

      await app.register(route.default, {
        prefix: `/api/v1/${folder}`,
      });
    }
  }
}

export default async function routes(app) {
  // ✅ NOW POINTS TO src/api/v1/public
  await loadRoutes(app, path.join(__dirname, "public"));
  await loadRoutes(app, path.join(__dirname, "private"));
}
