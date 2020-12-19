const home = {
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
};

export default home;
