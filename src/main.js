import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import Router from './router.js'
import axios from 'axios'
import VTooltip from 'v-tooltip'

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

var socket = io("http://localhost:8080")

//Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VTooltip)
Vue.use(VueAxios, axios);
//Vue.use(VueSocketIO, "http://127.0.0.1:8080")

/*
Vue.use(new VueSocketIO({
  debug: true,
  connection: "http://127.0.0.1:8080",
  vuex: {
    actionPrefix: 'SOCKET_',
    mutationPrefix: "SOCKET_"
  },
  option: { path: "/socket.io/" }
}))*/
Vue.use(VueSocketIOExt, socket)

new Vue({
  el: "#app",
  router: Router,
  render: h => h(App),
}).$mount('#app')
/*
axios.interceptors.request.use(
  config => {
    if (localStorage.JWT_TOKEN) {
      config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`;
    }
    return config;
  }
)
*/
