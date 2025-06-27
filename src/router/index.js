import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { title: "Dashboard" },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: { title: "Tentang" },
  },
  {
    path: "/guru",
    name: "Guru",
    component: () => import("../views/Guru.vue"),
    meta: { title: "Data Guru" },
  },
  {
    path: "/siswa",
    name: "Siswa",
    component: () => import("../views/Siswa.vue"),
    meta: { title: "Data Siswa" },
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
    meta: { title: "Pengaturan" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { title: "Masuk" },
  },
  {
    path: "/siswa/:id",
    name: "DetailSiswa",
    component: () => import("../views/DetailSiswa.vue"),
    meta: { title: "Detail Siswa" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware sederhana: redirect ke login kalau tidak ada token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.path !== "/login" && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
