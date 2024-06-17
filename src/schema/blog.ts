import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const blog = pgTable("blog", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("user_id").references(() => user.id),
});
