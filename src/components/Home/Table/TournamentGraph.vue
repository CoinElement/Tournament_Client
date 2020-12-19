<template>
  <el-card
    class="tournament-container card-box"
    :style="{ maxWidth: containerWidth + 'px' }"
  >
    <SetResultDialog ref="setresult" @resultSetted="onResultSetted" />
    <TeamInfoDialog ref="teamInfoDialog" />
    <div>
      <el-button @click="getTournamentInfo()">刷新</el-button>
      <el-tag :type="statusTagType" style="margin:10px">{{
        statusTagText
      }}</el-tag>
    </div>

    <div
      class="round-container"
      v-for="(round, rIndex) in resRounds"
      :key="rIndex"
    >
      <MatchBlock
        v-for="(teamName, tIndex) in round.teams"
        @openSetResult="onBlockClicked"
        :key="tIndex"
        :teamName="teamName"
        :round="rIndex"
        :table="tIndex"
        :rateMap="rateMap"
        :isLast="rIndex == resRounds.length - 1"
      />
    </div>
  </el-card>
</template>

<script>
import SetResultDialog from "./SetResultDialog";
import MatchBlock from "./MatchBlock";
import TeamInfoDialog from "../TeamInfoDialog.vue";

export default {
  components: { SetResultDialog, MatchBlock, TeamInfoDialog },
  props: {
    tournamentId: String
  },
  data() {
    return {
      resRounds: [],
      rateMap: new Map(),
      containerWidth: 0,
      successMessage: null,
      tourStatus: "MATCHING",
      statusTagText: "未知状态",
      statusTagType: "error"
    };
  },
  methods: {
    getTournamentInfo: function() {
      var msg = this.$notify({
        message: "Loading tournament info",
        duration: 0
      });
      this.axios.get(`/tournament/${this.tournamentId}`).then(response => {
        this.resRounds = response.data.rounds;
        response.data.teamInfo.forEach(item => {
          this.rateMap.set(item.teamName, item.rate);
        });
        this.tourStatus = response.data.status;
        this.$emit("loadFinished");
        msg.close();
        this.showSuccessMessage();
      });
    },
    onBlockClicked: function(round, table, teamName) {
      if (teamName === "") {
        // 设置比赛结果对话框
        this.$refs.setresult.$emit("open", this.tournamentId, round, table);
      } else {
        // 队伍信息对话框
        this.$refs.teamInfoDialog.$emit("open", teamName);
      }
    },
    onResultSetted: function() {
      this.getTournamentInfo();
    },
    showSuccessMessage: function() {
      if (this.successMessage) {
        this.successMessage.close();
      }
      this.successMessage = this.$notify.success({
        message: "Tournament info loaded",
        duration: 2000
      });
    }
  },
  watch: {
    tourStatus: function(newVal) {
      if (newVal == "MATCHING") {
        this.statusTagText = "比赛进行中";
        this.statusTagType = "warning";
      } else if (newVal == "ENDED") {
        this.statusTagText = "比赛结束";
        this.statusTagType = "success";
      } else {
        this.statusTagText = "未知状态";
        this.statusTagType = "error";
      }
    },
    tournamentId: function(newVal) {
      console.log(`new tournamentId: ${newVal}`);
      this.getTournamentInfo();
    },
    resRounds: function(newVal) {
      console.log(newVal);
      if (newVal[0]) {
        this.containerWidth = newVal[0].teams.length * 200;
      }
    }
  }
};
</script>

<style scoped>
.tournament-container {
  min-width: 400px;
  margin: 20px auto;
  margin-right: auto;
  border-radius: 5px;
  padding: 10px;
}
.round-container {
  display: table;
  width: 100%;
  height: 90px;
  table-layout: fixed;
}
</style>
