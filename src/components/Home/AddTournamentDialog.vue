<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="600px"
    :close-on-click-modal="false"
  >
    <!-- header -->
    <h2 slot="title">
      添加比赛
    </h2>

    <!-- body -->
    <el-form>
      <el-form-item label="比赛名称：" :label-width="'100px'">
        <el-input v-model="tournament_name"></el-input>
      </el-form-item>
      <el-form-item label="队伍列表：" :label-width="'100px'">
        <el-input v-model="team_input" />
      </el-form-item>
      <el-form-item label="赛制：" :label-width="'100px'">
        <el-select v-model="format" placeholder="请选择" style="width:460px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- footer -->
    <div slot="footer" class="buttons-wrap">
      <el-button @click="parse_teams" type="primary">
        提交
      </el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      team_input: process.env.VUE_APP_START_TOURNAMENT_INITIAL_DATA,
      dialogVisible: false,
      tournament_name: "",
      options: [
        {
          value: "SINGLE",
          label: "SINGLE"
        },
        {
          value: "CONSOLATION",
          label: "CONSOLATION",
          disabled: true
        }
      ],
      format: ""
    };
  },
  created: function() {
    this.$on("open", function() {
      this.dialogVisible = true;
    });
  },
  methods: {
    parse_teams: function() {
      var teams = this.team_input.split(",");
      teams.forEach((item, index) => {
        teams[index] = teams[index].trim();
      });
      this.post_tournament(teams);
    },
    post_tournament: function(teamNames) {
      var msg = this.$notify({
        message: "Requesting...",
        duration: 0
      });
      this.axios
        .post("/tournament", {
          tournamentName: this.tournament_name,
          teams: teamNames,
          format: this.format
        })
        .then(response => {
          msg.close();
          if (response && response.status == 200) {
            this.dialogVisible = false;
            this.$notify.success("创建成功");
            this.$emit("tourCreated");
          }
        })
        .catch(error => {
          if (error.response) {
            msg.close();
            this.$notify.error(`参数错误（${error.response.data.message}）`);
            this.$emit("tourCreated");
          }
        });
    }
  }
};
</script>

<style scoped></style>
