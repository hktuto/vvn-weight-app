<template>
    <div class="pageContainer dark:bg-gray-950">
        <slot />
    </div>
</template>

<style scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
}
</style>