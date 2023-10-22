<script lang="ts" setup>
const opened = ref(false);

const { record, validate, createNewRecord, getLatestDate } = useRecord(); 


const displayDate = computed({
    get(){
       return record.value.date ? new Date(record.value.date).toISOString().split('T')[0] : ''; 
    },
    set(value){
        record.value.date = new Date(value);
    }
})

function toggleOpened() {
    opened.value = !opened.value;
    if(opened.value) {
        record.value.date = new Date(); // if opened set record date to today
    }
}

async function submit() {
    await createNewRecord();
    toggleOpened();
}

onMounted(() => {
    getLatestDate();
})

</script>

<template>
    <div :class="{recordCreateContainer:true, opened}">
        <div class="recordCreateButton w-10 h-10" @click="toggleOpened">
            <UIcon class="w-8 h-8" :name="!opened ? 'i-heroicons-plus' : 'i-heroicons-arrow-down'" />
        </div>
        <UContainer class="w-full formContainer">

            <UCard class="w-full h-full overflow-auto">
                <Form :state="record" :validate="validate" @submit="submit" >
                    <UFormGroup label="Date" name="date">
                        <UInput v-model="displayDate" label="Weight" type="date" />
                    </UFormGroup>
                    <UFormGroup label="Weight" name="weight">
                        <UInput v-model="record.weight" label="Weight" placeholder="Enter your weight" type="number" step="0.1" />
                    </UFormGroup>
                    <UFormGroup label="Fat" name="fat">
                        <UInput v-model="record.fat" label="Weight" placeholder="Enter your weight" type="number" step="0.1" />
                    </UFormGroup>
                    <UFormGroup label="Muscle" name="muscle">
                        <UInput v-model="record.muscle" label="Weight" placeholder="Enter your weight" type="number" step="0.1" />
                    </UFormGroup>
                    <UFormGroup label="Body Water" name="bodyWater">
                        <UInput v-model="record.bodyWater" label="Weight" placeholder="Enter your weight" type="number" step="0.1" />
                    </UFormGroup>
                    <UFormGroup label="Body Age" name="bodyAge">
                        <UInput v-model="record.bodyAge" label="Weight" placeholder="Enter your weight" type="number" step="0.1" />
                    </UFormGroup>
                    <UFormGroup label="Visceral Fat" name="visceralFat">
                        <UInput v-model="record.visceralFat" label="Weight" placeholder="Enter your weight" type="number" step="0.1" />
                    </UFormGroup>
                    <UButton type="submit" class="w-full">Confirm</UButton>
                </Form>
            </UCard>
        </UContainer>
    </div>
</template>

<style lang="scss" scoped>
.recordCreateContainer{
    width: 3rem;
    transform: translateY(0);
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    .formContainer{
        transition: opacity .3s ease-in-out;
        opacity: 0;
    }
    &.opened{
        transform: translateY(-400px);
        gap: 0;
        .formContainer{
            opacity: 1;
        }
    }    
}
.recordCreateButton{
    border-radius: 50%;
    background-color: rgb(var(--color-primary-400));
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1;
}

.formContainer{
    position:absolute;
    top: 2rem;
    width: 100vw;
    height: 400px;
}
</style>
