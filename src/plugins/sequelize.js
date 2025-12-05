import { Sequelize } from "sequelize";
import fp from "fastify-plugin";
import { initModels } from "../models/init-models.js";
import dotenv from "dotenv";
dotenv.config();


const sequelizePlugin = async (
  fastify,
  options
) => {
  const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST, DB_DIALECT } =
    fastify.config;

  const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    logging: false,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
    ...(process.env.NODE_ENV === "uat"
      ? {}
      : {
          dialectOptions: {
            ssl: true,
          },
        }),
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  initModels(sequelize);
  fastify.decorate("sequelize", sequelize);
};

export default fp(sequelizePlugin);
