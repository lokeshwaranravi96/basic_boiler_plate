import { readdirSync } from "fs";
import { join } from "path";

const routesLoader = (fastify, sourceDir) => {
  readdirSync(sourceDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((item) => item.name)
    .forEach(async (item) => {
      let route = await import(`${sourceDir}/${item}`);
      fastify.register(route.default, { prefix: `/api/v1/${item}` });
    });
};

const routes = (fastify, _, done) => {
  //Routes of Public API
  routesLoader(fastify, join(__dirname, "public"));
  //Routes of Private API
  routesLoader(fastify, join(__dirname, "private"));

  done();
};

export default routes;
