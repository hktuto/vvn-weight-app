export const useRecord = () => {
    const { data } = useAuth()
    const record = useState("userRecord", () =>({
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
            record.value = {
                date: new Date(),
                weight: lastRecord.weight,
                fat: lastRecord.fat,
                muscle : lastRecord.muscle,
                bodyWater: lastRecord.bodyWater,
                bodyAge: lastRecord.bodyAge,
                visceralFat : lastRecord.visceralFat
            }
        }
    }

    async function createNewRecord(){
        const newRecord = await $fetch('/api/record/' + data.value?.user.id as string,  {
            method: 'POST',
            body: record.value
        });
        console.log(newRecord)
        await getLatestDate();
    }



    return {
        record,
        validate,
        createNewRecord,
        getLatestDate
    }
}