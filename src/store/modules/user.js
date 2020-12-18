const state = {
  token: localStorage.getItem("USER_TOKEN")
    ? localStorage.getItem("USER_TOKEN")
    : ""
};

const mutations = {
  login: (state, token) => {
    state.token = token;
    localStorage.setItem("USER_TOKEN", token);
  },
  logout: state => {
    state.token = null;
    localStorage.removeItem("USER_TOKEN");
  }
};

export default {
  namespaced: true,
  state: state,
  mutations: mutations
};
