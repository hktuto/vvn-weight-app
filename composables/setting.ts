import { user } from '@/db/schema';
import { setting } from '@/db/schema';


export const useSetting = () => {
    const settingData = useState('userSetting',() => ({
        birthday:"",
        height: undefined,
        sex:"",
        scale:""
    }))

    const ready = ref(false);
    const sexOptions = ref([
        {name:"Male", value:'M'},
        {name:"Female", value:'F'}
    ])

    const scaleOptions = ref([
        {name:"KG", value:'KG'},
        {name:"LB", value:'LB'}
    ])

    function validate(state:any) {
        const errors = [];
        if(!state.height) errors.push({path: 'height', message: 'Height is required'});
        if(!state.scale) errors.push({path: 'scale', message: 'Scale is required'});
        if(!state.birthday) errors.push({path: 'birthday', message: 'Birthday is required'});
        if(state.scale && !['KG', 'LB'].includes(state.scale)) errors.push({path: 'scale', message: 'Scale must be kg or lb'});
        if(state.sex && !['M', 'F'].includes(state.sex)) errors.push({path:'sex', message: "Sex Must be Male or Female"});
        return errors;
    }

    const getSetting = async (userId: string) => {
        const res = await $fetch<{setting:any}>("/api/setting/user/" + userId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
         settingData.value = res.setting;
        ready.value = true;
    }

    async function saveSetting(state:any) {
        
        const body = {
            ...settingData.value,
            height: Number(settingData.value.height),
        }
        console.log(body)
        const res = await $fetch("/api/setting", {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })
        console.log(res);
        await getSetting(settingData.value.userId);
        // TODO : add notification
    }

    return {
        sexOptions,
        scaleOptions,
        settingData,
        getSetting,
        validate,
        saveSetting
    }
}