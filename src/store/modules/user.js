const state = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : ""
};

const mutations = {
  login: (state, token) => {
    state.token = token;
    localStorage.setItem("token", token);
  },
  logout: state => {
    state.token = null;
    localStorage.removeItem("token");
  }
};

export default {
  namespaced: true,
  state: state,
  mutations: mutations
};
