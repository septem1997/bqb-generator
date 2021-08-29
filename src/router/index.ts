import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/templateChoose.vue"),
  },
  {
    name:'preview',
    path: "/preview",
    component: () => import("@/views/preview.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
