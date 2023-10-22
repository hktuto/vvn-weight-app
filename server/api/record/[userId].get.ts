import { db } from "@/server/sqlite-service";
import { eq } from "drizzle-orm";
import { record } from "~/db/schema";
export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.params?.userId as string;
        const settingData = db
            .select()
            .from(record)
            .where(eq(record.userId, parseInt(userId)))
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