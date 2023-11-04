import { db } from "@/server/sqlite-service";
import dayjs from "dayjs";

import { eq, and, between } from "drizzle-orm";
import { record, setting } from "~/db/schema";
import { bmiCalculator, bmrCalculator } from "~/utils/formula";




export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        body.date = new Date(body.date);
        body.userId = parseInt(event.context.params?.userId as string);
        // get user data 
        const userSetting = await db.select()
                            .from(setting)
                            .where(eq(setting.userId, parseInt(body.userId)))
                            .get();
        
        // calculate user bmi
        if(userSetting?.height) {
            const height = userSetting?.height / 100
            body.bmi = bmiCalculator(height, body.weight); 
            if(userSetting?.birthday) {
                const age = dayjs(userSetting?.birthday).diff(dayjs(),'years');
                body.bmr = bmrCalculator(body.sex, age, body.weight, height);
            }
        }
        console.log(body)
        if(!body.id){
            return await db.insert(record).values(body).run();
        }else{
            return await db.update(record).set(body).where(eq(record.id, body.id))
        }
    } catch (error: any) {
        console.log(error)
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
        
    }
})