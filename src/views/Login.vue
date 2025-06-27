<template>
  <div class="mx-auto max-w-sm p-4">
    <h2 class="mb-4 text-xl font-bold">Login</h2>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <input
        v-model="username"
        placeholder="Username"
        class="w-full border p-2"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full border p-2"
      />
      <button type="submit" class="w-full bg-blue-600 p-2 text-white">
        Login
      </button>
    </form>
    <p class="mt-2 text-red-500" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "../api/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await login(username.value, password.value);
    localStorage.setItem("token", res.data.token);
    router.push("/");
  } catch {
    error.value = "Username/password salah";
  }
};
</script>
