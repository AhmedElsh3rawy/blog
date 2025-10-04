import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import env from "../../utils/env";
import * as schema from "./schema";
import logger from "../logger";

const pool = new Pool({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
});

export const db = drizzle(pool, { schema, logger: true });

pool
  .connect()
  .then((client) => {
    logger.info("Connected to Postgres");
    client.release();
  })
  .catch((err) => {
    logger.error(`Database connection error: ${err.message}`);
  });
