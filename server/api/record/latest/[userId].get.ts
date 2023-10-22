import { db } from "@/server/sqlite-service";
import { eq } from "drizzle-orm";
import { record } from "~/db/schema";
export default defineEventHandler(async (event) => {
    try {
        const userId = event.context.params?.userId as string;
        const data = await db.query.record.findMany({
            where: (record, { eq }) => (eq(record.userId, parseInt(userId))),
            orderBy: (record, { desc }) => [desc(record.date)],
            limit: 1,
        });
        if(!data || data.length === 0) {
            throw new Error("No record found");
        }
        return data[0];
    } catch(e:any) {
        throw createError({
            statusCode: 400,
            statusMessage: e.message,
          });
    }
})