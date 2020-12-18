<template>
  <div class="tournament-container">
    <SetResultDialog ref="setresult" />
    <div
      class="round-container"
      v-for="(round, rIndex) in resRounds"
      :key="rIndex"
    >
      <MatchBlock
        v-for="(teamName, tIndex) in round.teams"
        @openSetResult="openSetResult"
        :key="tIndex"
        :teamName="teamName"
        :round="rIndex"
        :table="tIndex"
        :rateMap="rateMap"
        :isLast="rIndex == resRounds.length - 1"
      />
    </div>
  </div>
</template>

<script>
import SetResultDialog from "./SetResultDialog";
import MatchBlock from "./MatchBlock";

export default {
  components: { SetResultDialog, MatchBlock },
  props: {
    tournamentId: String
  },
  data() {
    return {
      resRounds: [],
      rateMap: new Map()
    };
  },
  methods: {
    getTournamentInfo: function() {
      this.axios.get(`/tournament/${this.tournamentId}`).then(response => {
        console.log("gotTournamentInfo:", response);
        this.resRounds = response.data.rounds;
        response.data.teamInfo.forEach(item => {
          this.rateMap.set(item.teamName, item.rate);
        });
      });
    },
    openSetResult: function(round, table) {
      console.log("Parent openSetResult");
      this.$refs.setresult.$emit("open", this.tournamentId, round, table);
    }
  },
  watch: {
    tournamentId: function(newVal) {
      console.log(`new tournamentId: ${newVal}`);
      this.getTournamentInfo();
    }
  }
};
</script>

<style scoped>
.tournament-container {
  height: 900px;
}
.round-container {
  display: table;
  width: 100%;
  height: 90px;
  table-layout: fixed;
}
</style>
