<script setup>
import { onMounted, ref } from "vue";
import { getKelas } from "../api/siswa";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const kelas = ref([]);

const loadKelas = async () => {
  try {
    const res = await getKelas();
    kelas.value = res.data.data;
  } catch (err) {
    console.error("Gagal ambil data Kelas:", err);
    // router.push("/login");
  }
};

onMounted(loadKelas);
</script>
<template>
  <div class="page-kelas">
    <h2 class="text-3xl">{{ route.meta.title }}</h2>

    <div class="flex justify-start gap-6 overflow-x-auto rounded p-4">
      <div class="w-1/3 rounded shadow-md">
        <table
          class="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <thead
            class="bg-sky-400 text-sm uppercase tracking-wide text-gray-700"
          >
            <tr class="text-center">
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">Kelas</th>
              <th class="px-4 py-3">Tingkat</th>
              <th class="px-4 py-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(k, i) in kelas"
              :key="k.id"
              class="text-sm text-gray-700 transition duration-150 ease-in-out hover:bg-orange-100"
              :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-200'"
            >
              <td class="border-t px-4 py-2 text-center">{{ i + 1 }}</td>
              <td class="border-t px-4 py-2 text-center">{{ k.nama_kelas }}</td>
              <td class="border-t px-4 py-2 text-center">{{ k.tingkat }}</td>
              <td class="border-t px-4 py-2 text-center">Details</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
