import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import Router from './router.js'
import axios from 'axios'
import VTooltip from 'v-tooltip'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

var socket = io("http://localhost:8080");
Vue.prototype.$socket = socket;
Vue.config.productionTip = false;
Vue.use(VTooltip);
Vue.use(VueAxios, axios);
Vue.use(ElementUI)
Vue.use(VueSocketIOExt, socket)
console.log(process.env)

new Vue({
  el: "#app",
  router: Router,
  render: h => h(App),
}).$mount('#app')
