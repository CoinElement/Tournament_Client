import Vue from "vue";
import VueRouter from "vue-router";
import home from "./home";
import login from "./login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  login,
  home
];

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    //判断是否有标题
    document.title = to.meta.title;
  }
  next(); //执行进入路由，如果不写就不会进入目标页
});

export default router;
