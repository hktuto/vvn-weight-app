<script lang="ts" setup>

</script>

<template>
<div class="pageContainer">
    <UiHeader>
        header
        <template #right>
            <UIcon name="i-heroicons-cog-8-tooth" class="w-10 h-10" @click="$router.push('/setting')" />
        </template>
    </UiHeader>
    <slot />
    <UiMenu />
</div>

</template>

<style lang="scss" scoped>
.pageContainer{
    width:100%;
    height: 100%;
    overflow: hidden;
    display : grid;
    grid-template-rows: min-content 1fr min-content;

}
</style>