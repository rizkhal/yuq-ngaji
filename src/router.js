import { createRouter, createWebHistory } from "vue-router";

import Main from "@/pages/Main.vue";

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
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

export default router;
