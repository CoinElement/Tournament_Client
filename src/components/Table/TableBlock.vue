<template>
    <div class="block-container">
        <div class="block" v-tooltip="tool_tip" @mouseover="selectStyle()">
            <span>{{ groupname }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tool_tip: 'Loading',
        };
    },
    props: {
        groupname: String,
    },
    methods: {
        selectStyle: function() {
            this.axios
                .post(
                    'http://127.0.0.1:8080/getrate',
                    {
                        token: localStorage.JWT_TOKEN,
                        team: this.groupname,
                    },
                    {
                        'Content-Type': 'application/json',
                    }
                )
                .then((response) => {
                    /*
                    console.log(
                        'team ' +
                            this.groupname +
                            ' rate: ' +
                            response.data.data +
                            '%'
                    );
                    */
                    this.tool_tip = 'Rate : ' + response.data.data + '%';
                });
        },
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
