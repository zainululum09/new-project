<script setup>
import { ref, computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import BaseAlert from "./components/BaseAlert.vue";

const route = useRoute();
const isExpanded = ref(true);

// Deteksi jika saat ini di halaman login
const isLoginPage = computed(() => route.path === "/login");
</script>

<template>
  <div class="app">
    <!-- Sidebar hanya muncul jika bukan halaman login -->
    <Sidebar v-if="!isLoginPage" v-model:expanded="isExpanded" />

    <!-- Main dengan marginLeft hanya jika bukan halaman login -->
    <main
      :style="
        !isLoginPage
          ? {
              marginLeft: isExpanded ? 'var(--sidebar-width)' : '72px',
            }
          : {}
      "
      class="px-8 py-6 transition-all duration-300"
    >
      <BaseAlert />
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --primary: #ffc250;
  --primary-alt: #e6ac41;
  --grey: #64748b;
  --dark: #49443b;
  --dark-alt: #3d3930;
  --light-alt: #f1f5f9;
  --light: #ffffff;
  --sidebar-width: 220px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;
}

main {
  flex: 1 1 0;
  min-height: 100vh;
  padding: 2rem;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    padding-left: 6rem;
  }
}
</style>
