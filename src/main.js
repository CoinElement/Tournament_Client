import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import Router from "./router.js";
import axios from "axios";
import VTooltip from "v-tooltip";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(VTooltip);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);

new Vue({
  el: "#app",
  router: Router,
  render: h => h(App)
}).$mount("#app");
