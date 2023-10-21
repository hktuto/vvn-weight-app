import { eq } from "drizzle-orm";
import { user } from "~/db/schema";
import { db } from "~/server/sqlite-service";


export default defineEventHandler(async (event) => {
    try {
      const userId = event.context.params?.id as string;
      const body = await readBody(event);
      const editUser = {
        ...body
      }
      const userResp = db
        .update(user)
        .set(editUser)
        .where(eq(user.id, parseInt(userId)))
        .run();
      return { user: userResp };
    } catch (e: any) {
      throw createError({
        statusCode: 400,
        statusMessage: e.message,
      });
    }
  });