<template>
  <div>
    <h2>{{ route.meta.title }}</h2>
    <button @click="handleLogout">Logout</button>
    <ul v-if="siswa.length">
      <li v-for="s in siswa" :key="s.id">{{ s.nama }}</li>
    </ul>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { getAllSiswa } from "../api/siswa";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const siswa = ref([]);

const fetchData = async () => {
  try {
    const res = await getAllSiswa();
    // console.log(res.data);
    siswa.value = res.data;
  } catch {
    router.push("/login");
  }
};

onMounted(fetchData);

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
