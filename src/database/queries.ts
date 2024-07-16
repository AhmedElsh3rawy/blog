import { db } from "./db";
import { eq, sql } from "drizzle-orm";
import { users, posts, tokens } from "./schema";

export const findUser = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: sql`${users.email} = ${email}`,
  });
  return user;
};

export const addUser = async (
  username: string,
  email: string,
  password: string,
) => {
  await db
    .insert(users)
    .values({ username: username, email: email, password: password });
};

export const addToken = async (token: string, id: number) => {
  await db.insert(tokens).values({ refreshToken: token, userId: id });
};

export const deleteToken = async (id: number) => {
  await db.delete(tokens).where(eq(tokens.userId, id));
};

export const getPost = async (postId: number) => {
  return await db.select().from(posts).where(eq(posts.id, postId));
};

export const addPost = async (content: string, authorId: number) => {
  await db.insert(posts).values({ content: content, authorId: authorId });
};

export const updatePost = async (postId: number, newContent: string) => {
  await db
    .update(posts)
    .set({ content: newContent })
    .where(eq(posts.id, postId));
};

export const deletePost = async (postId: number) => {
  await db.delete(posts).where(eq(posts.id, postId));
};
