const state = () => ({
  tournamentId: ""
});

const mutations = {
  setTournamentId(tournamentId) {
    state.tournamentId = tournamentId;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
