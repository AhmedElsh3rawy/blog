import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const client = new Client({
  connectionString: process.env.DB_URL as string,
});

async function dbConnect() {
  await client.connect();
}
dbConnect();

export const db = drizzle(client, { schema, logger: true });
