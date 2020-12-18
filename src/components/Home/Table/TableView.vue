<template>
  <div class="container">
    <TournamentSelecter />
    <TournamentGraph v-bind:tournamentId="tournament_id" />
    <StartTournament ref="addtour" />
  </div>
</template>

<script>
import TournamentGraph from "./TournamentGraph";
import StartTournament from "../AddTournamentDialog";
import TournamentSelecter from "../TournamentSelecter";

export default {
  name: "Table",
  components: { StartTournament, TournamentGraph, TournamentSelecter },
  props: {
    // msg: String,
  },
  data() {
    return {
      startTournamentVisible: false,
      groups: [],
      tournament_id: "",
      tournament_id_list: [],
      rates: []
    };
  },
  methods: {
    open_add: function() {
      this.$refs.addtour.$emit("open");
    },
    updateTournamentList: function() {
      this.axios.get("/alltournament").then(response => {
        console.log("get alltournamentid");
        this.tournament_id_list = response.data.tournamentId;
        this.tournament_id = response.data.tournamentId[0];
        this.pull_data();
      });
    },
    pull_data: function() {
      this.axios.get(`/tournament/${this.tournament_id}`).then(response => {
        console.log("Get tournament info response:", response);
        if (response.data != null) {
          this.groups = response.data.rounds;
        }
        this.rates = new Array(response.data.teams.length);
      });
    }
  },
  mounted: function() {
    this.axios
      .get(process.env.VUE_APP_BACKEND_BASE + "/alltournament", {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
          // token: localStorage.JWT_TOKEN
        }
      })
      .then(response => {
        console.log("getalltournamentid");
        this.tournament_id_list = response.data.tournamentId;
        this.tournament_id = response.data.tournamentId[0];
        this.pull_data();
      });
  },
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

<style scoped>
.container {
  width: 100%;
  height: 900px;
}
</style>
