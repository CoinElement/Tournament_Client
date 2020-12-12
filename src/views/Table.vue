<template>
  <div class="container">
    <div style="margin: 50px">
      <el-select id="tours" v-model="tournament_id">
        <el-option v-for="tour in tournament_id_list" :key="tour" :value="tour">
          {{ tour }}
        </el-option>
      </el-select>
      <el-button @click="pull_data">
        拉取数据
      </el-button>
      <el-button @click="open_add">
        添加比赛
      </el-button>
    </div>
    <div class="tour-container">
      <div
        class="round-container"
        v-for="(table, index) in groups"
        :key="index"
      >
        <TableBlock
          v-for="(team, tindex) in table.teams"
          @openSetResult="openSetResult"
          :key="tindex"
          :groupname="team"
          :round="index"
          :table="tindex"
          :groups="groups[0]"
          :rates="rates"
          :islast="index == groups.length - 1"
        />
      </div>
    </div>
    <StartTournament ref="addtour" />
    <SetResultDialog ref="setresult" />
  </div>
</template>

<script>
import TableBlock from "@/components/Table/TableBlock";
import StartTournament from "@/components/Table/StartTournament";
import SetResultDialog from "@/components/Table/SetResultDialog";

export default {
  name: "Table",
  components: { TableBlock, StartTournament, SetResultDialog },
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
  watch: {
    tournament_id: function() {
      /*
      if (oldVal != "") {
        this.$socket.client.emit("leave", oldVal);
      }
      if (newVal != "") {
        this.$socket.client.emit("join", newVal);
      }
      */
    }
  },
  methods: {
    openSetResult: function(round, table) {
      console.log("Parent openSetResult");
      this.$refs.setresult.$emit("open", this.tournament_id, round, table);
    },
    open_add: function() {
      this.$refs.addtour.$emit("open");
    },
    updateTournamentList: function() {
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
    pull_data: function() {
      // this.updateTournamentList();
      this.axios
        .get(
          process.env.VUE_APP_BACKEND_BASE +
            "/tournament/" +
            this.tournament_id +
            "/" +
            localStorage.USER_NAME,
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
              // token: localStorage.JWT_TOKEN
            }
          }
        )
        .then(response => {
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
.tour-container {
  height: 900px;
}
.round-container {
  display: table;
  width: 100%;
  height: 90px;
  table-layout: fixed;
}
</style>
