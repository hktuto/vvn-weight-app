import { db } from "@/server/sqlite-service";
import { eq } from "drizzle-orm";
import { setting } from "~/db/schema";

export default defineEventHandler(async (event) => {
    try {
      const body = await readBody(event);
      const userId = body.id as string;
      const newSetting = {
        ...body
      }
      delete newSetting.id;
      console.log(newSetting, parseInt(userId))
      const settingResp = db
        .update(setting)
        .set(newSetting)
        .where(eq(setting.id, parseInt(userId)))
        .run();
      return { setting: settingResp };
    } catch (e: any) {
      throw createError({
        statusCode: 400,
        statusMessage: e.message,
      });
    }
  });