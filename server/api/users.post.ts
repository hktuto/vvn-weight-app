import { user } from "@/db/schema";
import { db } from "@/server/sqlite-service";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newUser = {
      ...body
    }
    const result = db.insert(user).values(newUser).run();
    return { newUser : result}
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});