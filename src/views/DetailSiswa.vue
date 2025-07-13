<template>
  <div class="mx-auto max-w-full p-6">
    <h2 class="mb-2 text-3xl font-semibold text-blue-600">
      Biodata - {{ siswa?.nama || "NAMA PESERTA DIDIK" }}
    </h2>

    <form
      class="grid grid-cols-1 gap-6 rounded-lg bg-gray-100 p-6 shadow md:grid-cols-2"
    >
      <!-- Data Peserta Didik -->
      <div class="rounded-md bg-white p-4">
        <h3
          class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-700"
        >
          <span class="material-icons text-blue-500">person</span>
          Data Peserta Didik
        </h3>

        <!-- Foto Upload (Opsional) -->
        <div class="mb-4 flex items-start gap-4">
          <div
            class="flex h-40 w-32 items-center justify-center rounded border border-dashed border-gray-400 text-sm text-gray-500"
          >
            FOTO SISWA
          </div>
          <div class="flex-1 space-y-2">
            <label class="block font-medium">Foto Siswa</label>
            <input type="file" class="input" />
            <div class="flex justify-end gap-2">
              <button
                type="button"
                class="flex items-center gap-1 rounded bg-gray-400 px-3 py-1 text-white"
              >
                <span class="material-icons align-middle text-sm"
                  >photo_camera</span
                >
                Buka Kamera
              </button>
              <button
                type="button"
                class="flex items-center gap-1 rounded bg-blue-500 px-3 py-1 text-white"
              >
                <span class="material-icons align-middle text-sm"
                  >cloud_upload</span
                >
                Upload
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="mb-1 block text-sm font-medium">Nama Lengkap</label>
            <input type="text" v-model="siswa.nama" class="input" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">NIK</label>
            <input type="text" v-model="siswa.nik" class="input" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="mb-1 block text-sm font-medium">NIS</label>
              <input type="text" v-model="siswa.nis" class="input" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">NISN</label>
              <input type="text" v-model="siswa.nisn" class="input" />
            </div>
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">Jenis Kelamin</label>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-1">
                <input type="radio" value="L" v-model="siswa.jenis_kelamin" />
                Laki-laki
              </label>
              <label class="flex items-center gap-1">
                <input type="radio" value="P" v-model="siswa.jenis_kelamin" />
                Perempuan
              </label>
            </div>
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">Tempat Lahir</label>
            <input type="text" v-model="siswa.tempat_lahir" class="input" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">Tanggal Lahir</label>
            <input type="date" v-model="siswa.tanggal_lahir" class="input" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium">No. Telp</label>
            <input type="text" v-model="siswa.no_hp" class="input" />
          </div>
        </div>
      </div>

      <!-- Data Alamat Peserta Didik -->
      <div class="rounded-md bg-white p-4">
        <h3
          class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-700"
        >
          <span class="material-icons text-blue-500">location_on</span>
          Data Alamat Peserta Didik
        </h3>

        <div class="space-y-3">
          <Wilayah
            v-model:propinsi="siswa.propinsi"
            v-model:kabupaten="siswa.kabupaten"
            v-model:kecamatan="siswa.kecamatan"
            v-model:desa="siswa.desa"
          />
          <textarea
            v-model="siswa.alamat"
            placeholder="Alamat"
            class="input h-24 resize-none"
          ></textarea>
          <div class="grid grid-cols-2 gap-3">
            <input
              type="text"
              v-model="siswa.rt"
              placeholder="RT"
              class="input"
            />
            <input
              type="text"
              v-model="siswa.rw"
              placeholder="RW"
              class="input"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-12">
          <button
            type="button"
            class="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            <span class="material-icons align-middle text-sm">arrow_back</span>
            Kembali
          </button>
          <button
            type="submit"
            class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <span class="material-icons align-middle text-sm">save</span> Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSiswaById } from "../api/siswa";
import Wilayah from "../components/Wilayah.vue";

const route = useRoute();
const router = useRouter();
const siswa = ref({});

onMounted(async () => {
  try {
    const res = await getSiswaById(route.params.id);
    siswa.value = res.data.data;
  } catch {
    router.push("/siswa");
  }
});
</script>

<style scoped>
.input {
  @apply w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
