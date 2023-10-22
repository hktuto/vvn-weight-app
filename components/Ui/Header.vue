<template>
    <div class="headerContainer px-2">
        <div class="leftSection">
            <slot name="left" />
        </div>
        <div class="centerSection">
            <slot  />
        </div>  
        <div class="rightSection">
            <slot name="right" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.headerContainer{
    width: 100%;
    display: grid;
    grid-template-columns: min-content 1fr min-content;
}
</style>