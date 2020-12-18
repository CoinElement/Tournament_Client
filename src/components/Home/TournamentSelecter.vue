<template>
  <div>
    <el-select id="tours" v-model="selectedTournamentId">
      <el-option v-for="tour in tournamentList" :key="tour" :value="tour">
        {{ tour }}
      </el-option>
    </el-select>
    <el-button @click="getAllTournament"> 刷新列表 </el-button>
    <el-button @click="openAdd"> 添加比赛 </el-button>
    <StartTournament ref="addtour" />
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
      this.axios
        .get(`/alltournament`)
        .then(response => {
          console.log(`GotTournamentList: ${response.data}`);
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
