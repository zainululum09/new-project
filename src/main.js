import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";

router.beforeEach((to, from, next) => {
  const defaultTitle = "Sistem Sekolah";
  document.title = to.meta.title
    ? `${defaultTitle} - ${to.meta.title}`
    : defaultTitle;
  next();
});

createApp(App).use(router).mount("#app");
