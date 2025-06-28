<template>
  <div>
    <!-- Hero -->
    <section
      id="home"
      class="flex h-screen items-center justify-center px-6 text-center md:px-20"
    >
      <div class="w-1/2 text-left">
        <h1 class="mb-2 text-4xl font-bold">
          Selamat Datang di <br />
          SMP Ibnu Aqil Bogor
        </h1>
        <p class="mb-6 text-gray-700">
          Tanamkan Ilmu, Tebarkan Akhlak, Sukseskan Masa Depan.
        </p>
        <a
          href="#tentang"
          class="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
          >Pelajari Lebih Lanjut</a
        >
      </div>
      <div class="w-1/2">
        <img src="/public/img/hero.jpg" alt="" class="rounded-2xl shadow-lg" />
      </div>
    </section>

    <!-- Tentang -->
    <section
      id="tentang"
      class="bg-lime-200 px-6 pb-56 pt-10 text-center md:px-20"
    >
      <h2 class="mb-4 text-2xl font-bold">Tentang SMP Ibnu Aqil Bogor</h2>
      <p class="text-gray-700">
        SMP Ibnu Aqil Bogor adalah sekolah menengah pertama swasta yang
        didirikan pada 15 Mei 1992 dan terletak di Jl. Lingkar Laladon No.256,
        Laladon, Kec. Ciomas, Kabupaten Bogor, Jawa Barat. Bernaung di bawah
        Yayasan Haji Agus Salim Bogor dan memiliki akreditasi A, sekolah ini
        menyelenggarakan kurikulum nasional terpadu dengan nilai-nilai keislaman
        Ahlussunah wal Jama'ah Dilengkapi fasilitas modern seperti ruang kelas,
        perpustakaan, lab komputer (dengan internet 50 Mbps), dan ruang olahraga
        di atas lahan seluas 9.009m², SMP Ibnu Aqil berkomitmen membentuk siswa
        yang cerdas, berakhlak mulia, berwawasan luas, dan siap menghadapi
        tantangan global. Melalui program akademik, ekstrakurikuler (olahraga,
        seni, pengembangan keterampilan), serta pembiasaan religi, sekolah
        menjunjung tinggi pengembangan kognitif, spiritual, dan karakter sesuai
        visi untuk mencetak insan beriman, berilmu, dan mandiri.
      </p>
    </section>

    <!-- Berita -->
    <section id="berita" class="px-6 py-10 md:px-20">
      <h2 class="mb-6 text-center text-2xl font-bold">Berita Terbaru</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div class="overflow-hidden rounded border shadow-sm">
          <img
            src="https://source.unsplash.com/400x250/?school,student"
            class="h-48 w-full object-cover"
          />
          <div class="p-4">
            <p class="mb-1 text-sm text-gray-500">01 Januari 2024</p>
            <h3 class="mb-2 font-semibold">PENGUMUMAN PPDB 2025/2026</h3>
            <p class="text-sm text-gray-600">
              Pendaftaran Peserta Didik Baru dibuka! Info lengkap dan formulir
              bisa diunduh di situs resmi. Ayo bergabung bersama keluarga besar
              SMP Ibnu Aqil.
            </p>
          </div>
        </div>
        <div class="overflow-hidden rounded border shadow-sm">
          <img
            src="https://source.unsplash.com/400x250/?school,student"
            class="h-48 w-full object-cover"
          />
          <div class="p-4">
            <p class="mb-1 text-sm text-gray-500">12 Desember 2024</p>
            <h3 class="mb-2 font-semibold">AGENDA ORIENTASI SISWA BARU</h3>
            <p class="text-sm text-gray-600">
              Orientasi siswa baru Angkatan 2025 akan dilaksanakan pada 10 Juli
              2025 di aula utama. Silakan orang tua hadir untuk pemaparan visi,
              misi, dan fasilitas sekolah.
            </p>
          </div>
        </div>
        <div class="overflow-hidden rounded border shadow-sm">
          <img
            src="https://source.unsplash.com/400x250/?school,student"
            class="h-48 w-full object-cover"
          />
          <div class="p-4">
            <p class="mb-1 text-sm text-gray-500">12 Desember 2024</p>
            <h3 class="mb-2 font-semibold">PELATIHAN KEPEMIMPINAN OSIS</h3>
            <p class="text-sm text-gray-600">
              Program pelatihan kepemimpinan peserta OSIS berlangsung 15–17 Juni
              2025. Kegiatan ini bertujuan membentuk karakter dan kreativitas
              siswa sebagai calon pemimpin.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- Media Sosial -->
    <section id="sosial" class="bg-gray-50 px-6 py-10 md:px-20">
      <h2 class="mb-8 text-center text-2xl font-bold text-gray-800">
        Ikuti Kami di Media Sosial
      </h2>
      <div class="grid gap-6 text-center md:grid-cols-3">
        <!-- Instagram -->
        <a
          href="https://www.instagram.com/"
          target="_blank"
          class="flex flex-col items-center justify-center rounded bg-pink-500 p-6 text-white shadow transition hover:bg-pink-600"
        >
          <i class="bi bi-instagram mb-3" style="font-size: 3rem"></i>
          <span class="text-lg font-semibold">Instagram</span>
        </a>

        <!-- YouTube -->
        <a
          href="https://www.youtube.com/"
          target="_blank"
          class="flex flex-col items-center justify-center rounded bg-red-600 p-6 text-white shadow transition hover:bg-red-700"
        >
          <i class="bi bi-youtube mb-3" style="font-size: 3rem"></i>
          <span class="text-lg font-semibold">YouTube</span>
        </a>

        <!-- Facebook -->
        <a
          href="https://www.facebook.com/"
          target="_blank"
          class="flex flex-col items-center justify-center rounded bg-blue-600 p-6 text-white shadow transition hover:bg-blue-700"
        >
          <i class="bi bi-facebook mb-3" style="font-size: 3rem"></i>
          <span class="text-lg font-semibold">Facebook</span>
        </a>
      </div>
    </section>

    <!-- Kontak -->
    <section id="kontak" class="bg-white px-4 py-12 md:px-0">
      <div class="mx-auto mb-10 max-w-4xl text-center">
        <h2 class="text-3xl font-bold text-gray-800">Hubungi Kami</h2>
        <p class="mt-2 text-gray-600">
          Silakan isi formulir berikut untuk mengirim pesan kepada kami.
        </p>
      </div>

      <form
        @submit.prevent
        class="mx-auto max-w-4xl space-y-6 rounded-lg bg-lime-100 px-8 py-10 shadow"
      >
        <!-- Nama & Email -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="mb-1 block font-medium text-gray-700" for="nama"
              >Nama Lengkap</label
            >
            <input
              type="text"
              id="nama"
              name="nama"
              class="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Masukkan nama Anda"
              required
            />
          </div>
          <div>
            <label class="mb-1 block font-medium text-gray-700" for="email"
              >Email</label
            >
            <input
              type="email"
              id="email"
              name="email"
              class="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="nama@email.com"
              required
            />
          </div>
        </div>

        <!-- Pesan -->
        <div>
          <label class="mb-1 block font-medium text-gray-700" for="pesan"
            >Pesan</label
          >
          <textarea
            id="pesan"
            name="pesan"
            rows="5"
            class="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
            placeholder="Tuliskan pesan Anda di sini..."
            required
          ></textarea>
        </div>

        <!-- Tombol -->
        <div class="text-center">
          <button
            type="submit"
            class="rounded-md bg-green-600 px-6 py-2 font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            <i class="bi bi-send-fill mr-2"></i>
            Kirim Pesan
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup></script>
