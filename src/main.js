import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import Router from './router.js'
import axios from 'axios'
/*
import VueSocketIO from 'vue-socket.io'
*/

//Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueAxios, axios);
/*
Vue.use(new VueSocketIO({
  debug: true,
  connection: "http://192.168.123.1:9999",
  vuex: {
    actionPrefix: 'SOCKET_',
    mutationPrefix: "SOCKET_"
  }
}))
*/

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