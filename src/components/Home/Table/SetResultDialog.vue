<template>
  <el-dialog
    :visible.sync="resultDialogVisible"
    :close-on-click-modal="false"
    width="600px"
    @close="onClose()"
  >
    <h2 slot="title" class="not-select">设置比赛结果</h2>
    <el-form class="not-select">
      <el-form-item label="比赛ID:" :label-width="'80px'">
        <el-input v-model="tournamentId" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="Round:" :label-width="'80px'">
        <el-input v-model="round" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="Table:" :label-width="'80px'">
        <el-input v-model="table" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="Winner:" :label-width="'80px'">
        <el-radio-group v-model="result">
          <el-radio :label="'TEAM_ONE'">队伍1</el-radio>
          <el-radio :label="'TEAM_TWO'">队伍2</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="buttons-wrap">
      <el-button type="primary" @click="postSetResult()">
        提交
      </el-button>
      <el-button @click="resultDialogVisible = false">取消</el-button>
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
    postSetResult: function() {
      var msg = this.$notify({
        title: "Processing",
        message: "Requesting set result"
      });
      this.axios
        .post(
          `/tournament/${this.tournamentId}/${this.round}/${this.table + 1}`,
          {
            winner: this.result
          }
        )
        .then(response => {
          msg.close();
          if (response && response.data.winner) {
            this.$notify.success({
              title: "Success",
              message: "比赛结果设置成功"
            });
          } else if (response && response.data.winner == null) {
            this.$notify.warning("前一轮比赛未结束");
          }
          this.$emit("resultSetted");
        })
        .catch(error => {
          msg.close();
          if (error.response && error.response.data.message) {
            this.$notify.error({
              title: "Error",
              message: error.response.data.message
            });
          }
        });
      this.resultDialogVisible = false;
    }
  }
};
</script>

<style scoped></style>
