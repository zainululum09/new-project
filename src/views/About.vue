<template>
  <div class="page-about">
    <h2 class="text-3xl">About Page</h2>
    <p>This is a About page</p>
    <hr />
    <div class="relative max-w-2xl">
      <input
        type="text"
        v-model="keyword"
        placeholder="Cari Nama/NPSN sekolah..."
        @input="handleInput"
        class="w-full rounded border px-4 py-2 shadow"
      />

      <ul
        v-if="results.length && showList"
        class="absolute z-10 max-h-60 w-full divide-y overflow-y-auto rounded border bg-white shadow"
      >
        <li
          v-for="(item, index) in results"
          :key="index"
          @click="selectSchool(item.nama_sekolah, item.npsn)"
          class="cursor-pointer px-4 py-1 hover:bg-gray-100"
        >
          {{ item.nama_sekolah }}
          <span class="font-bold">({{ item.npsn }})</span>
          <br />
          <span class="text-sm text-sky-600">
            {{ item.kecamatan }} - {{ item.kabupaten }} - {{ item.propinsi }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getSekolah } from "../api/siswa";

const keyword = ref("");
const results = ref([]);
const showList = ref(false);
let timeout = null;

const handleInput = () => {
  clearTimeout(timeout);

  if (keyword.value.trim().length < 4) {
    results.value = [];
    showList.value = false;
    return;
  }

  timeout = setTimeout(async () => {
    try {
      const res = await getSekolah(keyword.value.trim());
      results.value = res.data;
      showList.value = res.data.length > 0;
    } catch (error) {
      console.error("Gagal memuat data sekolah:", error);
      results.value = [];
      showList.value = false;
    }
  }, 300);
};

const selectSchool = (nama, npsn) => {
  keyword.value = `${nama} (${npsn})`;
  showList.value = false;
};

onMounted(() => {
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.closest(".relative")) {
      showList.value = false;
    }
  });
});
</script>

<style scoped>
/* Optional scroll styling */
</style>
