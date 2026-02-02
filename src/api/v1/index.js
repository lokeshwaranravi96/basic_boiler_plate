import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadRoutes(app, baseDir) {
  const folders = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const folder of folders) {
    const routePath = path.join(baseDir, folder, "index.js");
    if (fs.existsSync(routePath)) {
      const route = await import(pathToFileURL(routePath).href);

      // ⚡ Register route WITHOUT public/private in URL
      await app.register(route.default, {
        prefix: `/${folder}`,
      });
    }
  }
}

export default async function routes(app) {
  await loadRoutes(app, path.join(__dirname, "public"));
  await loadRoutes(app, path.join(__dirname, "private"));
}
