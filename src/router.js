import TableComp from "./views/Table.vue";
import LoginComp from "./views/Login.vue";
import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", component: LoginComp },
    { path: "/table", component: TableComp },
    { path: "*", redirect: "/" }
  ]
});

export default router;
