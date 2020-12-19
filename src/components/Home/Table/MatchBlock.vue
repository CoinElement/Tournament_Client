<template>
  <div class="block-container not-select">
    <div class="up-line" :class="{ 'up-line-show': round != 0 }" />

    <el-tooltip placement="top" :disabled="!has_team">
      <div slot="content">
        队名:{{ teamName }}<br />
        胜率:{{ rate }}
      </div>
      <div class="block" @click="openSetResult()">
        <i class="el-icon-user" />
        <span>{{ teamName }}</span>
      </div>
    </el-tooltip>

    <div class="line-container" v-if="!isLast">
      <div :class="{ 'left-line': !is_left }" class="line" />
      <div :class="{ 'right-line': is_left }" class="line" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tool_tip: "No Team",
      is_left: true,
      rate: 0,
      has_team: false
    };
  },
  props: {
    teamName: String,
    round: Number,
    table: Number,
    groups: Object,
    rateMap: Map,
    isLast: Boolean
  },
  created: function() {
    this.is_left = this.table % 2 == 0;
    this.updateRate();
  },
  methods: {
    selectStyle: function() {
      this.tool_tip;
    },
    openSetResult: function() {
      console.log("Child openSetResult()");
      this.$emit("openSetResult", this.round, this.table, this.teamName);
    },
    updateRate: function() {
      if (this.teamName === "") {
        this.has_team = false;
        this.tool_tip = "No Team";
      } else {
        this.has_team = true;
        this.rate = (this.rateMap.get(this.teamName) * 100).toFixed(2) + "%";
        this.tool_tip = `队名：${this.teamName} <br />
        胜率: ${(this.rateMap.get(this.teamName) * 100).toFixed(2)} %`;
      }
    }
  },
  watch: {
    teamName: function() {
      this.updateRate();
    }
  }
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
  cursor: pointer;
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
