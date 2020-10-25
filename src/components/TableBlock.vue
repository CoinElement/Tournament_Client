<template>
    <div class="block-container">
        <div class="block">
            <span>{{ groupname }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        groupname: String,
    },
};
</script>

<style scoped>
.block-container {
    display: table-cell;
    text-align: center;
}
.block {
    border: 1px solid black;
    text-align: center;
    width: 70%;
    height: 70%;
    margin: auto;
}
</style>
