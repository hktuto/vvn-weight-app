import { user } from "../../db/schema";
import { db } from "../sqlite-service";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    if (!session) {
      return { status: 'unauthenticated!' }
    }
    const userResp = db.select().from(user).all();
    return { "user" : userResp}
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});