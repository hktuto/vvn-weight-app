<script lang="ts" setup>

</script>

<template>
<div class="pageContainer">
    <div class="content">
     <slot />
    </div>
    <UiMenu />
</div>

</template>

<style lang="scss" scoped>
.pageContainer{
    width:100%;
    height: 100%;
    overflow: auto;
    display : grid;
    grid-template-rows: 1fr;

}
</style>