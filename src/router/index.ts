import { createRouter, createWebHashHistory } from "vue-router";

const lead = () => import("@/pages/lead/index.vue");
const github = () => import("@/pages/github/index.vue");
const diary = () => import("@/pages/diary/index.vue");
const kaomoji = () => import("@/pages/kaomoji/index.vue");

export const routes = [
  {
    path: "/lead",
    component: lead,
    alias: ["/", "/index", "/home", "/potfolio"],
  },
  {
    path: "/github",
    component: github,
    alias: ["/git"],
  },
  {
    path: "/diary",
    component: diary,
    alias: ["/travel", "/travels", "/diaries"],
  },
  {
    path: "/kaomoji",
    component: kaomoji,
  },
];

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default Router;
