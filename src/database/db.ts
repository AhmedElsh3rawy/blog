import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DB_URL as string,
});

async function dbConnect() {
  await client.connect();
}
dbConnect();

export const db = drizzle(client);
