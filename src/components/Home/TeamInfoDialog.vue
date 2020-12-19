<template>
  <el-dialog
    :visible.sync="dialogVisiblity"
    :close-on-click-modal="false"
    class="not-select"
  >
    <h2 slot="title">队伍信息</h2>

    <el-form>
      <el-form-item label="队名:" :label-width="'100px'">
        <el-input v-model="teamName" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="胜率:" :label-width="'100px'">
        <el-input v-model="shownRate" :readonly="true"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="buttons-wrap">
      <el-button type="primary" @click="dialogVisiblity = false"
        >确认</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      teamName: "",
      dialogVisiblity: false,
      teamInfo: {
        rate: 0,
        joined: [],
        winned: []
      }
    };
  },
  methods: {
    getTeamInfo: function() {
      this.axios.get(`/team/${this.teamName}`).then(response => {
        this.teamInfo.rate = response.data.rate;
        this.teamInfo.joined = response.data.joinedTournament;
        this.teamInfo.winned = response.data.winnedTournament;
      });
    },
    showDialog: function() {
      this.dialogVisiblity = true;
    }
  },
  watch: {
    teamName: function() {
      this.getTeamInfo();
    }
  },
  computed: {
    shownRate: function() {
      return `${(this.teamInfo.rate * 100).toFixed(2)} %`;
    }
  },
  created: function() {
    this.$on("open", teamName => {
      this.teamName = teamName;
      this.dialogVisiblity = true;
    });
  }
};
</script>

<style></style>
