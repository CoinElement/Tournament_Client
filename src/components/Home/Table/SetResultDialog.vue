<template>
  <el-dialog
    title="设置比赛结果"
    :visible.sync="resultDialogVisible"
    :close-on-click-modal="false"
    width="600px"
    @close="onClose()"
  >
    <div>
      <div>
        Tournament:
        <el-input
          v-model="tournamentId"
          :label="'Tournament:'"
          :readonly="true"
        />
      </div>
      <div>Round: <el-input v-model="round" :readonly="true" /></div>
      <div>Table: <el-input v-model="table" :readonly="true" /></div>
      <el-radio-group v-model="result">
        <el-radio :label="'TEAM_ONE'">队伍1</el-radio>
        <el-radio :label="'TEAM_TWO'">队伍2</el-radio>
      </el-radio-group>
    </div>
    <div slot="footer" class="buttons-wrap">
      <el-button
        type="primary"
        @click="postSetResult(tournamentId, round, table + 1, result)"
      >
        提交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      resultDialogVisible: false,
      tournamentId: "",
      round: "",
      table: "",
      result: "TEAM_ONE"
    };
  },
  created: function() {
    this.$on("open", (tournamentid, round, table) => {
      this.resultDialogVisible = true;
      this.tournamentId = tournamentid;
      this.round = round;
      this.table = table;
    });
  },
  methods: {
    onClose: function() {
      this.$emit("update:startTournamentVisible", false);
    },
    postSetResult: function(tournamentid, round, table, result) {
      this.axios
        .post(`/tournament/${this.tournamentId}/${this.round}/${this.table}`, {
          winner: result
        })
        .then(response => {
          console.log("SetResult response:", response);
        });
    }
  }
};
</script>

<style scoped></style>
