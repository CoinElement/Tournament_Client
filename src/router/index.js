import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/home",
    redirect: "/home/table",
    name: "HomePage",
    meta: {
      requireAuth: true
    },
    component: () => import("@/views/Home"),
    children: [
      {
        path: "table",
        component: () => import("@/components/Home/Table/TableView"),
        meta: {
          title: "对战表"
        }
      }
    ]
  }
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
