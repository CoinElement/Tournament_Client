<template>
  <div class="container">
    <TournamentSelecter @tournamentSelected="tournamentSelected" />
    <TournamentGraph :tournamentId="tournament_id" />
  </div>
</template>

<script>
import TournamentGraph from "./TournamentGraph";
import TournamentSelecter from "../TournamentSelecter";

export default {
  name: "Table",
  components: {
    TournamentGraph,
    TournamentSelecter
  },
  props: {
    // msg: String,
  },
  data() {
    return {
      tournament_id: ""
    };
  },
  methods: {
    open_add: function() {
      this.$refs.addtour.$emit("open");
    },
    tournamentSelected: function(tournamentId) {
      this.tournament_id = tournamentId;
    }
  },
  mounted: function() {},
  sockets: {
    refresh: function(data) {
      if (data != null) {
        console.log(data);
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        if (jsonData.status === "success") {
          console.log("success");
          this.$set(
            this.groups[jsonData.round - 1],
            jsonData.table - 1,
            jsonData.team_name
          );
        }
      }
    }
  }
};
</script>

<style scoped></style>
