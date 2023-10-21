import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  age: integer("age"),
  username : text("username"),
  password : text("password"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});