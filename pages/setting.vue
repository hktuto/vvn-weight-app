<script lang="ts" setup>
definePageMeta({
    layout:'app'
})
const { getSetting, settingData, validate, saveSetting, sexOptions, scaleOptions } = useSetting();
const { data, signOut } = useAuth();

// for input type date to display iso string, need to convert to yyyy/mm/dd
const displayBirthday = computed({
    get(){
       return settingData.value.birthday ? new Date(settingData.value.birthday).toISOString().split('T')[0] : ''; 
    },
    set(value){
        settingData.value.birthday = new Date(value).toISOString();
    }
})

onMounted( async() => {
    if(data.value && data.value.user && data.value.user.id) {
        await getSetting(data.value.user.id);
    }
})
</script>


<template>
    <UCard class="max-w-4xl w-[90%]">
        <template #header>
            <h1 class="text-2xl font-bold">Setting</h1>
        </template>
        <Form :state="settingData" :validate="validate" @submit="saveSetting">
            <UFormGroup label="Birthday" name="birthday">
                <UInput v-model="displayBirthday" placeholder="Enter your height" type="date" />
            </UFormGroup>
            <UFormGroup label="Sex" name="sex">
                <USelect v-model="settingData.sex" :options="sexOptions" option-attribute="name" />
            </UFormGroup>
            <UFormGroup label="Scale" name="scale">
                <USelect v-model="settingData.scale" :options="scaleOptions" option-attribute="name" />
            </UFormGroup>
            <UFormGroup label="Height" name="height">
                <UInput v-model="settingData.height" label="Height" placeholder="Enter your height" type="number" />
            </UFormGroup>
            <UButton type="submit" color="primary">Save</UButton>
        </Form>
    </UCard>
    <UButton @click="signOut">Sign Out</UButton>
</template>