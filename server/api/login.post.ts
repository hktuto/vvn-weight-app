import { user } from "@/db/schema";
import { db } from "@/server/sqlite-service";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody(event);
    const userResp = db
      .select()
      .from(user)
      .where(eq(user.username, username))
      .get();

    if (!userResp) throw new Error("User Not Found");
    if (!bcrypt.compareSync(password, userResp.password as string)) {
      throw new Error("Invalid Credentials ");
    }

    const authUser = userResp;
    authUser["password"] = null;

    return authUser;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});