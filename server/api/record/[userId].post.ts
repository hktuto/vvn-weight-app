import { db } from "@/server/sqlite-service";
import { eq } from "drizzle-orm";
import { record } from "~/db/schema";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        body.date = new Date(body.date);
        body.userId = parseInt(event.context.params?.userId as string);
        const result = db.insert(record).values(body).run();
        return { result }
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
        
    }
})