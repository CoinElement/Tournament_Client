<template>
  <el-dialog
    title="设置比赛结果"
    :visible.sync="resultDialogVisible"
    :close-on-click-modal="false"
    width="600px"
    @close="onClose()"
  >
    <el-form>
      <el-form-item label="比赛ID:" :label-width="'100px'">
        <el-input v-model="tournamentId" readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="Round:" :label-width="'100px'">
        <el-input v-model="round" readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="Table:" :label-width="'100px'">
        <el-input v-model="table" readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="Winner:" :label-width="'100px'">
        <el-radio-group v-model="result">
          <el-radio :label="'TEAM_ONE'">队伍1</el-radio>
          <el-radio :label="'TEAM_TWO'">队伍2</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

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
      postData: {
        tournamentId: "",
        round: "",
        table: "",
        result: "TEAM_ONE"
      },
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
        .post(
          `/tournament/${this.tournamentId}/${this.round}/${this.table + 1}`,
          {
            winner: result
          }
        )
        .then(response => {
          console.log("SetResult response:", response);
        });
    }
  }
};
</script>

<style scoped></style>
