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
}
.item{
    cursor: pointer;
    
}
</style>