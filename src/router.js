import { createRouter, createWebHistory } from "vue-router";

import Main from "@/pages/Main.vue";
import Surah from "@/pages/Surah.vue";

const routes = [
  {
    path: "/",
    redirect: "/surah",
  },
  {
    path: "/surah",
    name: "Main",
    component: Main,
    meta: { guest: true },
  },
  {
    path: "/surah/:id",
    name: "Surah",
    component: Surah,
    meta: { guest: true },
  },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

export default router;
