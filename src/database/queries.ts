import { db } from "./db";
import { eq, sql } from "drizzle-orm";
import { users, tokens } from "./schema";

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

export async function addToken(token: string, id: number) {
  await db.insert(tokens).values({ refreshToken: token, userId: id });
}

export async function deleteToken(id: number) {
  await db.delete(tokens).where(eq(tokens.userId, id));
}
