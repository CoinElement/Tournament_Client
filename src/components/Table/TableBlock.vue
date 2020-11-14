<template>
    <div class="block-container">
        <div class="up-line" :class="{ 'up-line-show': round != 0 }"></div>
        <div class="block" v-tooltip="tool_tip" @mouseover="selectStyle()">
            <i class="el-icon-user"></i>
            <span>{{ groupname }}</span>
        </div>
        <div class="line-container">
            <div
                v-bind:class="{ 'left-line': !is_left && !islast }"
                class="line"
            ></div>
            <div
                v-bind:class="{ 'right-line': is_left && !islast }"
                class="line"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tool_tip: 'No Team',
            is_left: true,
        };
    },
    props: {
        groupname: String,
        round: Number,
        table: Number,
        groups: Array,
        rates: Array,
        islast: Boolean,
    },
    created: function() {
        this.is_left = this.table % 2 == 0;
    },
    methods: {
        selectStyle: function() {
            this.tool_tip;
        },
    },
    watch: {
        rates: function(newVal) {
            if (this.groupname === '') {
                this.tool_tip = 'No Team';
            } else {
                var indexOfTeam = this.groups.indexOf(this.groupname);
                this.tool_tip = 'Rate: ' + newVal[indexOfTeam] + '%';
            }
        },
    },
};
</script>

<style scoped>
.block-container {
    display: table-cell;
    height: 100%;
    text-align: center;
}

.up-line {
    margin-left: 50%;
    width: 0;
    height: 20%;
}
.block {
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    width: 70%;
    height: 60%;
    margin: auto;
    box-sizing: border-box;
}
.line-container {
    height: 20%;
}
.up-line-show {
    border-left: 1px solid black;
    border-right: 1px solid black;
}

.left-line {
    border-right: 2px solid black;
    border-bottom: 2px solid black;
}
.right-line {
    border-left: 2px solid black;
    border-bottom: 2px solid black;
}
.line {
    box-sizing: border-box;
    display: inline-block;
    width: 50%;
    height: 100%;
}
</style>
