<template>
  <div class="app">
    <Sidebar v-if="!isPublicPage" v-model:expanded="isExpanded" />

    <main
      v-if="!isPublicPage"
      :style="{
        marginLeft: isExpanded ? 'var(--sidebar-width)' : '72px',
      }"
      class="p-4 transition-all duration-300"
    >
      <BaseAlert />
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>

    <router-view v-else v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import BaseAlert from "./components/BaseAlert.vue";

const route = useRoute();
const isExpanded = ref(true);

// Halaman tanpa sidebar & alert
const isPublicPage = computed(() => ["/", "/login"].includes(route.path));
</script>

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
  margin-left: 72px;

  @media (max-width: 768px) {
    padding-left: 6rem;
  }
}

main.expanded {
  margin-left: var(--sidebar-width);
}

/* Slide-fade transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
