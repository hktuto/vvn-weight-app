import { db } from "@/server/sqlite-service";
import { eq } from "drizzle-orm";
import { setting } from "~/db/schema";
export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.params?.id as string;
        const settingData = db
            .select()
            .from(setting)
            .where(eq(setting.userId, parseInt(userId)))
            .get();
        if(!settingData) {
            return {setting: undefined};
        }
        return { setting: settingData };
    } catch(e:any) {
        throw createError({
            statusCode: 400,
            statusMessage: e.message,
          });
    }
})