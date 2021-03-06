import { createRouter, createWebHashHistory } from "vue-router";

const nav = () => import("@/pages/navigation/index.vue");
const lead = () => import("@/pages/lead/index.vue");
const github = () => import("@/pages/github/index.vue");
const article = () => import("@/pages/article/index.vue");
const diary = () => import("@/pages/diary/index.vue");
const music = () => import("@/pages/music/index.vue");
const record = () => import("@/pages/record/index.vue");
const moon = () => import("@/pages/moon/index.vue");
const logicfunc = () => import("@/pages/logicfunc/index.vue");
const points = () => import("@/pages/points/index.vue");
const kaomoji = () => import("@/pages/kaomoji/index.vue");
const metaball = () => import("@/pages/metaball/index.vue");
const logger = () => import("@/pages/logger/index.vue");
const imgFilter = () => import("@/pages/imgFilter/index.vue");

export const routes = [
  {
    path: "/navigation",
    component: nav,
    alias: ["/", "/index", "/nav", "/navigation", "/router", "/menu"],
  },
  {
    path: "/lead",
    component: lead,
    alias: ["/home", "/potfolio"],
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
    alias: ["/dj", "/cloudmusic", "/player", "/music-player"],
  },
  {
    path: "/record",
    component: record,
    alias: ["/record", "/records"],
  },
  {
    path: "/moon",
    component: moon,
    alias: ["/moon", "/sun", "/anthony-howe"],
  },
  {
    path: "/logicfunc",
    component: logicfunc,
    alias: ["/logicfunc"],
  },
  {
    path: "/points",
    component: points,
    alias: ["/points", "/point"],
  },
  {
    path: "/kaomoji",
    component: kaomoji,
  },
  {
    path: "/metaball",
    component: metaball,
  },
  {
    path: "/logger",
    component: logger,
  },
  {
    path: "/imgFilter",
    component: imgFilter,
  },
];

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default Router;
