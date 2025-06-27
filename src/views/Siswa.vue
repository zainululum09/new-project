<script setup>
import { ref, onMounted } from "vue";
import {
  tambahSiswa,
  getAllSiswa,
  deleteSiswaById,
  updateSiswa,
} from "../api/siswa";
import { useRouter, useRoute } from "vue-router";
import { useAlert } from "../components/useAlert";

const router = useRouter();
const route = useRoute();
const siswa = ref([]);

const { showAlert } = useAlert();
const editing = ref(false);
const editingNama = ref("");

const loadSiswa = async () => {
  try {
    const res = await getAllSiswa();
    siswa.value = res.data.data;
  } catch (err) {
    console.error("Gagal ambil data siswa:", err);
    router.push("/login");
  }
};

const editSiswa = (data) => {
  editing.value = true;
  editingNama.value = data.nama;
  form.value = { ...data }; // Menyalin seluruh data siswa ke form
};

const deleteSiswa = async (id) => {
  if (!confirm("Yakin ingin menghapus siswa ini?")) return;
  try {
    await deleteSiswaById(id);
    showAlert("Siswa berhasil dihapus", "success");
    loadSiswa();
  } catch (err) {
    showAlert("Gagal menghapus siswa " + err, "error");
  }
};

const form = ref({
  nis: "",
  nisn: "",
  nama: "",
  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
});

const submitForm = async () => {
  try {
    if (editing.value) {
      await updateSiswa(form.value.id, form.value);
      showAlert("Siswa berhasil diupdate", "success");
    } else {
      await tambahSiswa(form.value);
      showAlert("Siswa berhasil ditambahkan", "success");
    }
    await loadSiswa(); // refresh tabel
    resetForm();
  } catch (error) {
    showAlert("Gagal menambahkan siswa", "error");
  }
};

const resetForm = () => {
  editing.value = false;
  editingNama.value = "";
  form.value = {
    nis: "",
    nisn: "",
    nama: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
  };
};

onMounted(loadSiswa);
</script>

<template>
  <div class="p-4">
    <h2 class="mb-4 text-xl font-bold">{{ route.meta.title }}</h2>

    <div class="flex justify-start gap-6 overflow-x-auto rounded shadow">
      <div class="w-2/3">
        <table
          class="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <thead
            class="bg-sky-400 text-sm uppercase tracking-wide text-gray-700"
          >
            <tr class="text-center">
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">NIS</th>
              <th class="px-4 py-3">NISN</th>
              <th class="px-4 py-3">Nama</th>
              <th class="px-4 py-3">Jenis Kelamin</th>
              <th class="px-4 py-3">Tempat Lahir</th>
              <th class="px-4 py-3">Tanggal Lahir</th>
              <th class="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody class="mt-2">
            <tr
              v-for="(s, i) in siswa"
              :key="s.id"
              class="text-sm text-gray-700 transition duration-150 ease-in-out hover:bg-orange-100"
              :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-200'"
            >
              <td class="border-t px-4 py-2 text-center">{{ i + 1 }}</td>
              <td class="border-t px-4 py-2 text-center">{{ s.nis }}</td>
              <td class="border-t px-4 py-2 text-center">{{ s.nisn }}</td>
              <td class="border-t px-4 py-2">
                <router-link
                  :to="`/siswa/${s.id}`"
                  class="transition duration-200 hover:text-blue-600"
                >
                  {{ s.nama }}
                </router-link>
              </td>
              <td class="border-t px-4 py-2 text-center">
                {{
                  s.jenis_kelamin === "L"
                    ? "Laki-laki"
                    : s.jenis_kelamin === "P"
                    ? "Perempuan"
                    : s.jenis_kelamin
                }}
              </td>
              <td class="border-t px-4 py-2">{{ s.tempat_lahir }}</td>
              <td class="border-t px-4 py-2">
                {{
                  new Date(s.tanggal_lahir).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                }}
              </td>
              <td
                class="flex justify-center gap-4 border-t px-4 py-2 text-center"
              >
                <button
                  class="rounded bg-blue-600 px-3 py-1 font-medium text-white transition duration-200 hover:bg-blue-400"
                  @click="editSiswa(s)"
                >
                  Edit
                </button>

                <button
                  class="rounded bg-red-600 px-3 py-1 font-medium text-white transition duration-200 hover:bg-red-800"
                  @click="deleteSiswa(s.id)"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-1/3">
        <div class="overflow-hidden rounded-lg bg-white shadow-md">
          <div class="bg-blue-600 px-6 py-4 text-lg font-semibold text-white">
            {{
              editing
                ? `✏️ Edit Siswa - ${editingNama}`
                : "➕ Tambah Siswa Baru"
            }}
          </div>

          <form @submit.prevent="submitForm" class="space-y-4 p-6">
            <div>
              <label class="mb-1 block text-sm font-medium">NIS</label>
              <input
                v-model="form.nis"
                type="text"
                required
                class="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">NISN</label>
              <input
                v-model="form.nisn"
                type="text"
                required
                class="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">Nama Lengkap</label>
              <input
                v-model="form.nama"
                type="text"
                required
                class="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium"
                >Jenis Kelamin</label
              >
              <select
                v-model="form.jenis_kelamin"
                required
                class="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="" disabled>Pilih Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">Tempat Lahir</label>
              <input
                v-model="form.tempat_lahir"
                type="text"
                required
                class="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium"
                >Tanggal Lahir</label
              >
              <input
                v-model="form.tanggal_lahir"
                type="date"
                required
                class="w-full rounded border border-gray-300 px-3 py-2"
              />
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
