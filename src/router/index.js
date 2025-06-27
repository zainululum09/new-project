import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/HelloWorld.vue";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: () => import("../components/About.vue"),
    },
    {
      path: "/guru",
      component: () => import("../components/Guru.vue"),
    },
    {
      path: "/siswa",
      component: () => import("../components/Siswa.vue"),
    },
  ],
  history: createWebHistory(),
});

export default router;
