<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSiswaById } from "../api/siswa";

const route = useRoute();
const router = useRouter();
const siswa = ref(null);

onMounted(async () => {
  try {
    const res = await getSiswaById(route.params.id);
    siswa.value = res.data.data;
  } catch {
    router.push("/siswa");
  }
});

const formatTanggal = (tanggal) => {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const jenisKelaminLengkap = (kode) => {
  return kode === "L" ? "Laki-laki" : kode === "P" ? "Perempuan" : kode;
};
</script>

<template>
  <div class="max-w-3xl rounded-xl bg-white p-6 shadow-lg" v-if="siswa">
    <h2 class="mb-4 border-b pb-2 text-2xl font-semibold text-gray-800">
      📋 Data - {{ siswa.nama }}
    </h2>

    <div class="grid grid-cols-1 gap-4 text-gray-700 md:grid-cols-2">
      <div>
        <p class="font-semibold">🆔 NIS:</p>
        <p>{{ siswa.nis }}</p>
      </div>
      <div>
        <p class="font-semibold">🆔 NISN:</p>
        <p>{{ siswa.nisn }}</p>
      </div>

      <div>
        <p class="font-semibold">👤 Nama Lengkap:</p>
        <p>{{ siswa.nama }}</p>
      </div>
      <div>
        <p class="font-semibold">👫 Jenis Kelamin:</p>
        <p>{{ jenisKelaminLengkap(siswa.jenis_kelamin) }}</p>
      </div>

      <div>
        <p class="font-semibold">📍 Tempat Lahir:</p>
        <p>{{ siswa.tempat_lahir }}</p>
      </div>
      <div>
        <p class="font-semibold">📅 Tanggal Lahir:</p>
        <p>{{ formatTanggal(siswa.tanggal_lahir) }}</p>
      </div>
    </div>

    <div class="mt-6">
      <button
        @click="router.back()"
        class="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        ← Kembali
      </button>
    </div>
  </div>
</template>

<style scoped>
p {
  line-height: 1.6;
}
</style>
