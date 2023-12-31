import { integer, real, sqliteTable, sqliteView, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text('email').unique('email'),
  username : text("username").unique('username'),
  password : text("password"),
  createdAt: integer('createdAt', { mode: 'timestamp' }).$default(() => new Date()),
});


export const setting = sqliteTable("settings", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").references(() => user.id).unique('user_id'),
  scale: text('scale').default('KG'),
  height: real('height'),
  sex: text('sex').default('M'),
  birthday: integer('birthday', { mode: 'timestamp' }).$default(() => new Date()),
});

export const settingView = sqliteView("setting_view").as((qb) => qb.select().from(setting))

export const record = sqliteTable("records", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").references(() => user.id),
  weight: real('weight'),
  fat: real('fat'),
  muscle: real('muscle'),
  bodyWater: real('body_water'),
  bodyAge: integer('body_age'),
  bmr: integer('bmr'),
  bmi: real('bmi'),
  visceralFat: integer('visceral_fat'),
  date: integer('date', { mode: 'timestamp' }).$default(() => new Date()),
  createdAt: integer('createdAt', { mode: 'timestamp' }).$default(() => new Date()),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).$default(() => new Date()),
});