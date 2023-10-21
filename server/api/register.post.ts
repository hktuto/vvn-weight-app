import { eq } from 'drizzle-orm';
import * as bcrypt from "bcrypt";
import { users } from "@/db/schema";
import { db } from "@/server/sqlite-service";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    // check username is exist
    const user = await db.select().from(users).where(eq(users.username, body.username));
    if(user) {
      throw createError({
        statusCode: 400,
        statusMessage: "Username is exist",
      });
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    const newUser = {
      ...body,
      password : hashedPassword
    }
    const result = db.insert(users).values(newUser).run();
    return { newUser : result}
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});