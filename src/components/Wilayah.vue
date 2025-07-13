<template>
  <div class="space-y-4">
    <div>
      <label class="mb-1 block text-sm font-medium">Provinsi</label>
      <select v-model="selectedProvince" class="input">
        <option disabled value="">Pilih Provinsi</option>
        <option v-for="p in provinces" :key="p.code" :value="p.code">
          {{ p.name }}
        </option>
      </select>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium">Kabupaten/Kota</label>
      <select
        v-model="selectedRegency"
        class="input"
        :disabled="!regencies.length"
      >
        <option disabled value="">Pilih Kabupaten/Kota</option>
        <option v-for="r in regencies" :key="r.code" :value="r.code">
          {{ r.name }}
        </option>
      </select>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium">Kecamatan</label>
      <select
        v-model="selectedDistrict"
        class="input"
        :disabled="!districts.length"
      >
        <option disabled value="">Pilih Kecamatan</option>
        <option v-for="d in districts" :key="d.code" :value="d.code">
          {{ d.name }}
        </option>
      </select>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium">Desa/Kelurahan</label>
      <select
        v-model="selectedVillage"
        class="input"
        :disabled="!villages.length"
      >
        <option disabled value="">Pilih Desa/Kelurahan</option>
        <option v-for="v in villages" :key="v.code" :value="v.code">
          {{ v.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import {
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
} from "../api/wilayah";

// Props dari komponen induk
const props = defineProps({
  propinsi: String,
  kabupaten: String,
  kecamatan: String,
  desa: String,
});

// Emit untuk update ke induk (v-model)
const emit = defineEmits([
  "update:propinsi",
  "update:kabupaten",
  "update:kecamatan",
  "update:desa",
]);

// State untuk daftar wilayah
const provinces = ref([]);
const regencies = ref([]);
const districts = ref([]);
const villages = ref([]);

// State untuk selected value
const selectedProvince = ref("");
const selectedRegency = ref("");
const selectedDistrict = ref("");
const selectedVillage = ref("");

// Set initial selected value dari props (hanya sekali)
watchEffect(() => {
  if (props.propinsi) selectedProvince.value = props.propinsi;
  if (props.kabupaten) selectedRegency.value = props.kabupaten;
  if (props.kecamatan) selectedDistrict.value = props.kecamatan;
  if (props.desa) selectedVillage.value = props.desa;
});

// Load daftar provinsi saat awal
onMounted(async () => {
  const res = await getProvinces();
  provinces.value = res.data.data;
});

// Fetch Kab/Kota saat Provinsi berubah
watch(selectedProvince, async (val) => {
  emit("update:propinsi", val);
  regencies.value = [];
  districts.value = [];
  villages.value = [];
  selectedRegency.value = "";
  selectedDistrict.value = "";
  selectedVillage.value = "";

  if (val) {
    const res = await getRegencies(val);
    regencies.value = res.data.data;
  }
});

// Fetch Kecamatan saat Kabupaten berubah
watch(selectedRegency, async (val) => {
  emit("update:kabupaten", val);
  districts.value = [];
  villages.value = [];
  selectedDistrict.value = "";
  selectedVillage.value = "";

  if (val) {
    const res = await getDistricts(val);
    districts.value = res.data.data;
  }
});

// Fetch Desa saat Kecamatan berubah
watch(selectedDistrict, async (val) => {
  emit("update:kecamatan", val);
  villages.value = [];
  selectedVillage.value = "";

  if (val) {
    const res = await getVillages(val);
    villages.value = res.data.data;
  }
});

// Emit Desa saat dipilih
watch(selectedVillage, (val) => {
  emit("update:desa", val);
});

// ⛳ Auto-select kembali jika props sudah ada DAN daftar sudah di-fetch
watchEffect(() => {
  if (props.kabupaten && regencies.value.length && !selectedRegency.value) {
    selectedRegency.value = props.kabupaten;
  }

  if (props.kecamatan && districts.value.length && !selectedDistrict.value) {
    selectedDistrict.value = props.kecamatan;
  }

  if (props.desa && villages.value.length && !selectedVillage.value) {
    selectedVillage.value = props.desa;
  }
});
</script>

<style scoped>
.input {
  @apply w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
