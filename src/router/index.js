import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Top",
    component: () => import("../views/Top.vue"),
  },
  {
    path: "/registerMatch",
    name: "RegisterMatch",
    component: () => import("../views/RegisterMatch.vue"),
  },
  {
    path: "/registerPersonal",
    name: "RegisterPersonal",
    component: () => import("../views/RegisterPersonal.vue"),
  },
  {
    path: "/registerSinglesPlayer",
    name: "RegisterSinglesPlayer",
    component: () => import("../views/RegisterSinglesPlayer.vue"),
  },
  {
    path: "/registerDoublesPlayer",
    name: "RegisterDoublesPlayer",
    component: () => import("../views/RegisterDoublesPlayer.vue"),
  },
  {
    path: "/editMatch",
    name: "EditMatch",
    component: () => import("../views/EditMatch.vue"),
  },
  {
    path: "/showPlayerList",
    name: "ShowPlayerList",
    component: () => import("../views/ShowPlayerList.vue"),
  },
  {
    path: "/registerMission",
    name: "RegisterMission",
    component: () => import("../views/RegisterMission.vue"),
  },
  {
    path: "/showMission",
    name: "ShowMission",
    component: () => import("../views/ShowMission.vue"),
  },
  {
    path: "/selectedMission",
    name: "SelectedMission",
    component: () => import("../views/SelectedMission.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
