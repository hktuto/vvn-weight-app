import { user } from "@/db/schema";
import { db } from "@/server/sqlite-service";
import { eq } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  try {
    // get id as function parameter from route params
    const userId = event.context.params?.id as string;
    const userResp = db
      .select()
      .from(user)
      .where(eq(user.id, parseInt(userId)))
      .get();
    return { user: userResp };
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});