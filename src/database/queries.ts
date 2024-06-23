import { db } from "./db";
import { sql } from "drizzle-orm";
import { users } from "./schema";

export async function findUser(email: string) {
  const user = await db.query.users.findFirst({
    where: sql`${users.email} = ${email}`,
  });
  return user;
}

export async function addUser(
  username: string,
  email: string,
  password: string,
) {
  await db
    .insert(users)
    .values({ username: username, email: email, password: password });
}
