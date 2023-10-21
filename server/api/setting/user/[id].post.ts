import { db } from "@/server/sqlite-service";
import { eq } from "drizzle-orm";
import { setting } from "~/db/schema";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const result = db.insert(setting).values(body).run();
        return { newSetting : result}
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
        
    }
})