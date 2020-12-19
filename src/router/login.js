const login = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/Login.vue"),
  meta: {
    title: "登录"
  }
};

export default login;
