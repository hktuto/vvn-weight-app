import { db } from "@/server/sqlite-service";
import { eq } from "drizzle-orm";
import { record } from "~/db/schema";
export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.params?.userId as string;
        const data = await db.query.record.findFirst({
            where: (record, { eq }) => (eq(record.userId, parseInt(userId))),
        });
        if(!data) {
            throw new Error("No record found");
        }
        return data;
    } catch(e:any) {
        throw createError({
            statusCode: 400,
            statusMessage: e.message,
          });
    }
})