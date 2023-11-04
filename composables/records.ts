import dayjs from 'dayjs'
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);
export const useRecord = () => {
    const { data } = useAuth()
    const record = useState<{
        id?: number
        date: Date
        weight: number,
        fat: number,
        muscle : number,
        bodyWater: number,
        bodyAge: number,
        visceralFat : number
    }>("userRecord", () =>({
        date: new Date(),
        weight: 0,
        fat: 0,
        muscle : 0,
        bodyWater: 0,
        bodyAge: 0,
        visceralFat : 0
    }))

    function validate(state:any) {
        const errors = [];
        if(!state.weight) errors.push({path: 'weight', message: 'Weight is required'});
        if(!state.date) errors.push({path: 'date', message: 'Date is required'});
        return errors;
    }

    async function getLatestDate(){
        const lastRecord :any = await $fetch('/api/record/latest/' + data.value?.user.id as string,  {
            method: 'GET',
        } );
        if(lastRecord){
            // if lastRecord.date === today
            record.value = {
                date: new Date(),
                weight: lastRecord.weight,
                fat: lastRecord.fat,
                muscle : lastRecord.muscle,
                bodyWater: lastRecord.bodyWater,
                bodyAge: lastRecord.bodyAge,
                visceralFat : lastRecord.visceralFat
            }
            if(dayjs(lastRecord.date).isToday()){
                record.value.date = new Date(lastRecord.date);
                record.value.id = lastRecord.id
            }
        }else{
            record.value = {
                date: new Date(),
                weight: 0,
                fat: 0,
                muscle : 0,
                bodyWater: 0,
                bodyAge: 0,
                visceralFat : 0
            }
        }
    }

    async function createNewRecord(){
        const newRecord = await $fetch('/api/record/' + data.value?.user.id as string,  {
            method: 'POST',
            body: record.value
        });
        await getLatestDate();
    }



    return {
        record,
        validate,
        createNewRecord,
        getLatestDate
    }
}