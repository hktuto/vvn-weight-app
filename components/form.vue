<script lang="ts" setup>
const props = defineProps<{
    state: any,
    validate: any,
}>()
</script>

<template>
    <UForm v-bind="props" class="space-y-6">
        <slot />
    </UForm>
</template>
