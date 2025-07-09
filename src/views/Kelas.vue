<script setup>
import { onMounted, ref, computed } from "vue";
import {
  getKelas,
  tambahKelas,
  updateKelas,
  deleteKelas,
  anggota,
  nonKelas,
  tambahSiswaKelas,
  remAnggota,
} from "../api/siswa";
import { useRouter, useRoute } from "vue-router";
import { useAlert } from "../components/useAlert";

const route = useRoute();
const kelas = ref([]);

const { showAlert } = useAlert();
const editing = ref(false);
const editingKelas = ref("");

const showModal = ref(false);
const selectedKelasId = ref(null);
const namaKelas = ref(null);

const classMember = ref([]);
const siswaBebas = ref([]);
const tahunAjaranId = ref(null);

const loadKelas = async () => {
  try {
    const res = await getKelas();
    kelas.value = res.data.data;
  } catch (err) {
    console.error("Gagal ambil data Kelas:", err);
    // router.push("/login");
  }
};

const uniqueTahunAjaran = computed(() => {
  const seen = new Set();
  return kelas.value.filter((k) => {
    if (seen.has(k.tahun_ajaran_id)) return false;
    seen.add(k.tahun_ajaran_id);
    return true;
  });
});

const editKelas = (data) => {
  editing.value = true;
  editingKelas.value = data.nama_kelas;
  form.value = {
    id: data.id,
    nama_kelas: data.nama_kelas,
    tingkat: data.tingkat,
    tahun_ajaran_id: data.tahun_ajaran_id,
  };
};

// Modal Anggota Kelas
const isLoading = ref(false);

const anggotaKelas = async (id, nama_kelas) => {
  showModal.value = true;
  selectedKelasId.value = id;
  namaKelas.value = nama_kelas;

  try {
    const cm = await anggota(id);
    classMember.value = cm.data.data;

    // Ambil tahun_ajaran_id dari salah satu item atau dari kelas (jika tersedia)
    tahunAjaranId.value =
      cm.data.data[0]?.ta || cm.data.tahun_ajaran_id || null;

    const sb = await nonKelas();
    siswaBebas.value = sb.data.data;
  } catch (err) {
    showAlert("Not Found", "error");
  }
};

const closeModal = () => {
  showModal.value = false;
};

const tambahKeKelas = async (siswaId, tahunAjaranId) => {
  if (!siswaId || !selectedKelasId.value || !tahunAjaranId) {
    showAlert("Data tidak lengkap", "error");
    return;
  }
  try {
    const payload = {
      siswa_id: siswaId,
      kelas_id: selectedKelasId.value,
      tahun_ajaran_id: tahunAjaranId,
    };
    await tambahSiswaKelas(payload); // panggil API
    showAlert("Siswa berhasil ditambahkan ke kelas", "success");
    await anggotaKelas(selectedKelasId.value, namaKelas.value); // refresh
  } catch (err) {
    console.error(err);
    showAlert("Gagal menambahkan siswa", "error");
  }
};

const removeMemberClass = async (id) => {
  try {
    await remAnggota(id);
    showAlert("Siswa berhasil dikeluarkan dari kelas", "success");
    await anggotaKelas(selectedKelasId.value, namaKelas.value); // refresh
  } catch (err) {
    console.error(err);
    showAlert("Gagal mengeluarkan siswa", "error");
  }
};

const delKelas = async (id) => {
  if (!confirm("Yakin ingin menghapus Kelas ini?")) return;
  try {
    await deleteKelas(id);
    showAlert("Kelas berhasil dihapus", "success");
    loadKelas();
  } catch (err) {
    showAlert("Gagal menghapus Kelas " + err, "error");
  }
};

const form = ref({
  nama_kelas: "",
  tingkat: "",
  tahun_ajaran_id: "",
});

const submitForm = async () => {
  try {
    let res;
    if (editing.value) {
      res = await updateKelas(form.value.id, form.value);
    } else {
      res = await tambahKelas(form.value);
    }
    const response = { msg: res?.data?.message, stat: res?.data?.status };
    showAlert(response.msg, response.stat);

    await loadKelas(); // refresh tabel
    resetForm();
  } catch (error) {
    const response = { msg: res?.data?.message, stat: res?.data?.status };
    showAlert(response.msg, response.stat);
  }
};

const resetForm = () => {
  editing.value = false;
  editingKelas.value = "";
  form.value = {
    nama_kelas: "",
    tingkat: "",
    tahun_ajaran_id: "",
  };
};

onMounted(loadKelas);
</script>
<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

<template>
  <div class="page-kelas">
    <!-- Modal Anggota Kelas -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-40 flex justify-center bg-black bg-opacity-50 py-6"
      >
        <div class="relative w-2/3 rounded-lg bg-white p-6 shadow-lg">
          <h2 class="mb-4 text-xl font-semibold">
            Anggota Kelas - {{ namaKelas }}
          </h2>

          <div class="flex justify-start gap-2 overflow-x-auto rounded p-2">
            <!-- Anggota Kelas -->
            <div class="w-1/2">
              <div class="no-scrollbar max-h-[83vh] overflow-y-auto">
                <table class="min-w-full table-fixed bg-white">
                  <thead
                    class="bg-sky-400 text-sm uppercase tracking-wide text-white"
                  >
                    <tr class="text-center">
                      <th class="sticky top-0 bg-sky-400 px-4 py-3">#</th>
                      <th class="sticky top-0 bg-sky-400 px-4 py-3">
                        Nama Siswa
                      </th>
                      <th class="sticky top-0 bg-sky-400 px-4 py-3">L/P</th>
                      <th class="sticky top-0 bg-sky-400 px-4 py-3">@</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-if="classMember.filter((s) => s.siswa_id).length === 0"
                      class="text-center text-sm text-gray-500"
                    >
                      <td colspan="4" class="border px-4 py-4">
                        Belum Ada Anggota Kelas
                      </td>
                    </tr>
                    <tr
                      v-for="(s, i) in classMember.filter((s) => s.siswa_id)"
                      :key="s.siswa_id"
                      class="text-sm text-gray-700 transition duration-150 ease-in-out hover:bg-orange-100"
                      :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-200'"
                    >
                      <td class="border px-4 py-2 text-center">{{ i + 1 }}</td>
                      <td class="border px-4 py-2">{{ s.nama_siswa }}</td>
                      <td class="border px-4 py-2 text-center">{{ s.jk }}</td>
                      <td class="border px-4 py-2 text-center">
                        <button
                          @click="removeMemberClass(s.kelasSiswaId)"
                          class="rounded-lg bg-red-400 px-1 py-0.5 text-white hover:bg-red-600"
                        >
                          <span class="material-icons">remove</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Siswa Bebas -->
            <div class="w-1/2">
              <div class="no-scrollbar max-h-[83vh] overflow-y-auto">
                <table class="min-w-full table-fixed bg-white">
                  <thead
                    class="bg-sky-400 text-sm uppercase tracking-wide text-white"
                  >
                    <tr class="text-center">
                      <th class="sticky top-0 bg-sky-400 px-4 py-3">#</th>
                      <th class="sticky top-0 bg-sky-400 px-4 py-3">
                        Nama Siswa
                      </th>
                      <th class="sticky top-0 bg-sky-400 px-4 py-3">L/P</th>
                      <th class="sticky top-0 bg-sky-400 px-4 py-3">@</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(s, i) in siswaBebas"
                      :key="s.id"
                      class="text-sm text-gray-700 transition duration-150 ease-in-out hover:bg-orange-100"
                      :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-200'"
                    >
                      <td class="border px-4 py-2 text-center">{{ i + 1 }}</td>
                      <td class="border px-4 py-2">{{ s.nama_siswa }}</td>
                      <td class="border px-4 py-2 text-center">{{ s.jk }}</td>
                      <td class="border px-4 py-2 text-center">
                        <button
                          @click="tambahKeKelas(s.siswa_id, classMember[0]?.ta)"
                          class="rounded-lg bg-green-500 px-1 py-0.5 text-white hover:bg-green-600"
                        >
                          <span class="material-icons">add</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Tombol Tutup -->
          <button
            class="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
            @click="closeModal"
          >
            <span class="material-icons"> close </span>
          </button>
        </div>
      </div>
    </transition>

    <h2 class="text-3xl">{{ route.meta.title }}</h2>

    <div class="flex justify-start gap-16 overflow-x-auto rounded p-4">
      <div class="w-1/2 rounded shadow-md">
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
              <th class="px-4 py-3">Tahun Ajaran</th>
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
              <td class="border-t px-4 py-2 text-center">{{ k.nama }}</td>
              <td
                class="flex justify-center gap-6 border-t px-4 py-2 text-center"
              >
                <button
                  class="rounded bg-amber-600 px-1 pt-1 font-medium text-white transition duration-200 hover:bg-amber-400"
                  @click="anggotaKelas(k.id, k.nama_kelas)"
                >
                  <span class="material-icons"> groups </span>
                </button>
                <button
                  class="rounded bg-blue-600 px-1 pt-1 font-medium text-white transition duration-200 hover:bg-blue-400"
                  @click="editKelas(k)"
                >
                  <span class="material-icons"> edit </span>
                </button>

                <button
                  class="rounded bg-red-600 px-1 pt-1 font-medium text-white transition duration-200 hover:bg-red-800"
                  @click="delKelas(k.id)"
                >
                  <span class="material-icons"> delete </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-1/3">
        <div class="overflow-hidden rounded-lg bg-white shadow-md">
          <div class="text-md bg-blue-600 px-6 py-3 font-semibold text-white">
            {{
              editing
                ? `✏️ Edit Kelas - ${editingKelas}`
                : "➕ Tambah Kelas Baru"
            }}
          </div>
          <form @submit.prevent="submitForm" class="space-y-4 p-6">
            <div>
              <label class="mb-1 block text-sm font-medium">Nama Kelas</label>
              <input
                v-model="form.nama_kelas"
                type="text"
                required
                class="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">Tingkat</label>
              <select
                v-model="form.tingkat"
                required
                class="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="" disabled>Pilih Tingkat</option>
                <option value="7">VII</option>
                <option value="8">VIII</option>
                <option value="9">IX</option>
              </select>
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">Tahun Ajaran</label>
              <select
                v-model="form.tahun_ajaran_id"
                required
                class="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="" disabled>Pilih Tahun Ajaran</option>

                <option
                  v-for="ta in uniqueTahunAjaran"
                  :key="ta.tahun_ajaran_id"
                  :value="ta.tahun_ajaran_id"
                >
                  {{ ta.nama }}
                </option>
              </select>
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                {{ editing ? "Update" : "Simpan" }}
              </button>
              <button
                v-if="editing"
                type="button"
                @click="resetForm"
                class="mt-2 w-full rounded border border-gray-400 bg-red-600 px-4 py-2 text-white transition hover:bg-red-800"
              >
                Batal Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
