<template>
    <div class="menuContainer px-4 py-2">
        <div class="item" @click="$router.push('/')">Home</div>
        <RecordCreate />
        <div class="item" @click="$router.push('/setting')">Setting</div>
    </div>
</template>

<style lang="scss" scoped>
.menuContainer{
    position: absolute;
    left: 0;
    bottom: 0;
    width:100%;
    min-height: 3rem;
    overflow: visible;
    display: flex;
    justify-content: space-between;
    align-items: center;
    isolation: isolate;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 10rem;
        z-index: -1;
        background-image: var(--menu-gradient);
    }
}
.item{
    cursor: pointer;
    
}
</style>