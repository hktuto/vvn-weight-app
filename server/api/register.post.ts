import { eq } from 'drizzle-orm';
import * as bcrypt from "bcrypt";
import { setting, user } from "@/db/schema";
import { db } from "@/server/sqlite-service";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    // check username is exist
    const existUser = await db.select().from(user).where(eq(user.username, body.username));
    if(existUser && existUser.length > 0) {
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
    const result = db.insert(user).values(newUser).run();

    // get user id
    const userData = await db.select().from(user).where(eq(user.username, body.username));
    
    // create setting
    const settingData = {
      userId : userData[0].id,
    }
    db.insert(setting).values(settingData).run();
    return { newUser : result}
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});