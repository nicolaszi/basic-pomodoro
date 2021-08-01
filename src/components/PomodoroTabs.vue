<template>
    <div class="menu">
        <p :class="{'is-active':isActive(0)}">Pomodoro</p>
        <p :class="{'is-active':isActive(1)}">Short Break</p>
        <p :class="{'is-active':isActive(2)}">Long Break</p>
    </div>
</template>

<script>
export default {
    props: {
        step: Number
    },
    methods: {
        isActive(val) {
            return this.step == val;
        }
    }
}
</script>

<style scoped lang="scss">
.menu {
    padding-top: 2em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    p {
        margin: 10px;
        font-size: 1.4em;
        &.is-active{
            border-bottom: 2px solid black;
        }
    }
}
</style>