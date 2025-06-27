<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
      <img src="../assets/logo.png" alt="Vue" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons"> double_arrow </span>
      </button>
    </div>

    <h2 class="h2">Menu</h2>
    <div class="menu">
      <router-link class="button" to="/">
        <span class="material-icons">home</span>
        <span class="text">Dashboard</span>
      </router-link>
      <router-link class="button" to="/about">
        <span class="material-icons">assignment_ind</span>
        <span class="text">About</span>
      </router-link>
      <router-link class="button" to="/guru">
        <span class="material-icons">group</span>
        <span class="text">Data Guru</span>
      </router-link>
      <router-link class="button" to="/siswa">
        <span class="material-icons">people</span>
        <span class="text">Data Siswa</span>
      </router-link>
    </div>

    <div class="space"></div>
    <div class="menu">
      <router-link class="button" to="/setting">
        <span class="material-icons">settings</span>
        <span class="text">Setting</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";

const is_expanded = ref(false);

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 40px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  background-color: var(--dark);
  color: var(--light);
  transition: 0.2s ease-out;

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
    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h2,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  h2 {
    color: var(--grey);
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
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover,
      &.router-link-exact-active {
        background-color: var(--darl-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
        .text {
          text-decoration: underline;
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--primary);
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h2,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  .space {
    flex: 1 1 0;
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>
