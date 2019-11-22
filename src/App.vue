<template>
    <div>{{ msg }}</div>
</template>


<script>
module.exports = {
    data() {
        return {
            msg: "hello world"
        };
    },
    mounted() {
        console.log("hey");
    }
};
</script>