<template>
    <div class="menuContainer px-4">
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
        height: 4rem;
        z-index: -1;
        background-image: linear-gradient(to top, rgb(var(--color-gray-500) / 1), rgb(var(--color-gray-500) / 0));
    
    }
}
.item{
    cursor: pointer;
    
}
</style>