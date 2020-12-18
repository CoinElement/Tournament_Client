<template>
  <el-dialog :visible.sync="dialogVisible" width="600px">
    <h2 slot="title">
      添加比赛
    </h2>
    <el-input v-model="team_input" />
    <div slot="footer" class="buttons-wrap">
      <el-button @click="parse_teams" type="primary">
        提交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      team_input: "",
      dialogVisible: false
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
      this.axios
        .post("/tournament/", {
          teams: teamNames,
          format: "SINGLE"
        })
        .then(() => {
          this.$emit("update:startTournamentVisible", false);
        })
        .catch(error => {
          alert("error:" + error);
        });
    }
  }
};
</script>

<style scoped></style>
