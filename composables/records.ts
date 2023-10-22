export const useRecord = () => {

    const data = useState("userRecord", () =>({
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
        return errors;
    }

    async function getLatestDate(){
        
    }

    async function createNewRecord(){
        
    }



    return {
        data,
        validate,
        createNewRecord,
        getLatestDate
    }
}