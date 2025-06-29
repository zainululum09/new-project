<template>
  <aside :class="['sidebar', is_expanded && 'is-expanded']">
    <div class="logo">
      <img src="../assets/logo.png" alt="Vue Logo" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="toggleMenu">
        <span class="material-icons">double_arrow</span>
      </button>
    </div>

    <h2 class="h2">Menu</h2>
    <div class="menu">
      <router-link
        :to="'/dashboard'"
        class="button"
        :class="{ active: isActive('/') }"
      >
        <span class="material-icons">home</span>
        <span class="text">Dashboard</span>
      </router-link>

      <router-link
        :to="'/about'"
        class="button"
        :class="{ active: isActive('/about') }"
      >
        <span class="material-icons">assignment_ind</span>
        <span class="text">About</span>
      </router-link>

      <router-link
        :to="'/guru'"
        class="button"
        :class="{ active: isActive('/guru') }"
      >
        <span class="material-icons">group</span>
        <span class="text">Guru</span>
      </router-link>

      <!-- Parent Menu -->
      <div class="button" @click="toggleSiswaDropdown">
        <span class="material-icons">people</span>
        <span class="text">Siswa</span>
        <span class="material-icons ml-auto">
          {{ siswaDropdownOpen ? "expand_less" : "expand_more" }}
        </span>
      </div>

      <!-- Dropdown Child -->
      <transition name="slide-fade">
        <div v-if="siswaDropdownOpen" class="ml-6 flex flex-col">
          <router-link
            class="button text-sm"
            :class="{ active: isActive('/siswa') }"
            to="/siswa"
          >
            Data Siswa
          </router-link>
          <router-link
            class="button text-sm"
            :class="{ active: isActive('/kelas') }"
            to="/kelas"
          >
            Data Kelas
          </router-link>
        </div>
      </transition>
    </div>

    <div class="space"></div>

    <div class="menu">
      <router-link
        :to="'/setting'"
        class="button"
        :class="{ active: isActive('/setting') }"
      >
        <span class="material-icons">settings</span>
        <span class="text">Setting</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { defineModel } from "vue";
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";

const is_expanded = defineModel("expanded");
const route = useRoute();

const toggleMenu = () => {
  is_expanded.value = !is_expanded.value;
};

// Check if current route starts with target path
const isActive = (path) =>
  route.path === path || route.path.startsWith(path + "/");

const siswaDropdownOpen = ref(false);

// Cek apakah path sekarang termasuk route anak dari menu Siswa
const isSiswaSection = () =>
  route.path.startsWith("/siswa") || route.path.startsWith("/kelas");

// Manual toggle jika user klik parent menu
const toggleSiswaDropdown = () => {
  siswaDropdownOpen.value = !siswaDropdownOpen.value;
};

// Pantau perubahan route
watchEffect(() => {
  siswaDropdownOpen.value = isSiswaSection();
});
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--light-alt);
  color: var(--dark);
  transition: all 0.3s ease;
  width: 72px;

  &.is-expanded {
    width: var(--sidebar-width);
  }

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    .menu-toggle {
      .material-icons {
        font-size: 2rem;
        color: var(--dark);
        transition: transform 0.3s;
      }

      &:hover .material-icons {
        color: var(--primary);
        transform: translateX(0.5rem);
      }
    }
  }

  h2,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  h2 {
    color: var(--dark-alt);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5rem 1rem;
      transition: background-color 0.2s;

      .material-icons {
        font-size: 2rem;
        color: var(--dark);
      }

      .text {
        color: var(--dark);
        transition: 0.2s ease-out;
      }

      &:hover,
      &.active {
        background-color: var(--primary);

        .material-icons,
        .text {
          color: var(--light);
        }

        .text {
          text-decoration: underline;
        }
      }

      &.active {
        border-right: 5px solid var(--primary-alt);
      }
    }
  }

  &.is-expanded {
    .menu-toggle-wrap {
      top: -2rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h2,
    .button .text {
      opacity: 1;
    }

    .button .material-icons {
      margin-right: 1rem;
    }
  }

  .space {
    flex: 1 1 0;
  }

  @media (max-width: 768px) {
    z-index: 99;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
