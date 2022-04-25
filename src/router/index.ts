import { createRouter, createWebHashHistory } from "vue-router";

const lead = () => import("@/pages/lead/index.vue");
const github = () => import("@/pages/github/index.vue");
const article = () => import("@/pages/article/index.vue");
const diary = () => import("@/pages/diary/index.vue");
const music = () => import("@/pages/music/index.vue");
const record = () => import("@/pages/record/index.vue");
const sun = () => import("@/pages/sun/index.vue");
const kaomoji = () => import("@/pages/kaomoji/index.vue");

export const routes = [
  {
    path: "/lead",
    component: lead,
    alias: ["/index", "/home", "/potfolio"],
  },
  {
    path: "/github",
    component: github,
    alias: ["/git"],
  },
  {
    path: "/article",
    component: article,
    alias: ["/articles"],
  },
  {
    path: "/diary",
    component: diary,
    alias: ["/travel", "/travels", "/diaries"],
  },
  {
    path: "/music",
    component: music,
    alias: ["/", "/dj", "/cloudmusic", "/player", "/music-player"],
  },
  {
    path: "/record",
    component: record,
    alias: ["/record", "/records"],
  },
  {
    path: "/sun",
    component: sun,
    alias: ["/sun", "/anthony-howe"],
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
