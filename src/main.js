import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "./axios";
import router from "./router";
import store from "./store";
import VTooltip from "v-tooltip";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(VTooltip);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
