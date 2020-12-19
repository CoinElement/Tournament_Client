<template>
  <div>
    <el-select id="tours" v-model="selectedTournamentId" style="width:300px">
      <el-option v-for="tour in tournamentList" :key="tour" :value="tour">
        {{ tour }}
      </el-option>
    </el-select>
    <el-button @click="getAllTournament"> 刷新列表 </el-button>
    <el-button @click="openAdd"> 添加比赛 </el-button>
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
      tournamentList: []
    };
  },
  created: function() {
    this.getAllTournament();
  },
  methods: {
    getAllTournament: function() {
      var lastTourId = this.selectedTournamentId;
      var msg = this.$notify({
        message: "Refreshing tournament list",
        duration: 0
      });
      this.axios
        .get(`/alltournament`)
        .then(response => {
          msg.close();
          console.log(`GotTournamentList: ${response.data}`);
          this.$notify.success("比赛列表加载完毕");
          this.tournamentList = response.data.tournamentId;
          if (this.tournamentList.indexOf(lastTourId) == -1) {
            this.selectedTournamentId = this.tournamentList[0];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    openAdd: function() {
      this.$refs.addtour.$emit("open");
    }
  },
  watch: {
    selectedTournamentId: function(newVal) {
      this.$emit("tournamentSelected", newVal);
    }
  }
};
</script>

<style scoped></style>
