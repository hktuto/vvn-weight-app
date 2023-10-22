<script lang="ts" setup>
const opened = ref(false);

const { data, validate, createNewRecord, getLatestDate } = useRecord(); 

onMounted(() => {
    getLatestDate();
})

</script>

<template>
    <div :class="{recordCreateContainer:true, opened}">
        <div class="recordCreateButton w-10 h-10" @click="opened = !opened">
            <UIcon class="w-8 h-8" :name="!opened ? 'i-heroicons-plus' : 'i-heroicons-arrow-down'" />
        </div>
        <UContainer class="w-full">

            <UCard class="w-full">
                <Form :state="data" :validate="validate" @submit="createNewRecord" />
                card content here
                <UButton class="w-full">Confirm</UButton>
            </UCard>
        </UContainer>
    </div>
</template>

<style lang="scss" scoped>
.recordCreateContainer{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    transform: translateY(0);
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    &.opened{
        transform: translateY(-100%);
        gap: 0;
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
</style>
