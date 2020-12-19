<template>
  <div>
    <el-select id="tours" v-model="selectedTournamentId" style="width:300px">
      <el-option
        v-for="tour in tournamentList"
        :key="tour.tournamentId"
        :value="tour.tournamentId"
        :label="tour.tournamentName"
      >
        {{ tour.tournamentName }}
      </el-option>
    </el-select>
    <el-button @click="getAllTournament" :loading="loading">
      刷新列表
    </el-button>
    <el-button type="primary" @click="openAdd"> 创建比赛 </el-button>
    <StartTournament ref="addtour" @tourCreated="getAllTournament" />
  </div>
</template>

<script>
import StartTournament from "@/components/Home/AddTournamentDialog";

export default {
  name: "TournamentSelecter",
  components: { StartTournament },
  data() {
    return {
      selectedTournamentId: "",
      tournamentList: [],
      loading: true
    };
  },
  created: function() {
    this.getAllTournament();
  },
  methods: {
    getAllTournament: function() {
      this.loading = true;
      var lastTourId = this.selectedTournamentId;
      var msg = this.$notify({
        type: "info",
        message: "Refreshing tournament list",
        duration: 0
      });

      this.axios
        .get(`/alltournament`)
        .then(response => {
          msg.close();
          console.log(`GotTournamentList: ${response.data}`);
          this.$notify.success("比赛列表加载完毕");
          this.tournamentList = response.data.tournament;
          this.tournamentList.forEach(element => {
            if (element.tournamentId != lastTourId) {
              this.selectedTournamentId = this.tournamentList[0].tournamentId;
            }
          });
        })
        .catch(error => {
          msg.close();
          this.$notify({
            type: "error",
            message: error.message
          });
        });

      this.loading = false;
    },
    openAdd: function() {
      this.$refs.addtour.$emit("open");
    }
  },
  watch: {
    selectedTournamentId: function(newVal) {
      console.log(`TournamentSelecter: ${newVal}`);
      this.$emit("tournamentSelected", newVal);
    }
  }
};
</script>

<style scoped></style>
