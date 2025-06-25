<template>
  <div class="py-18">
    <!-- Hero -->
    <section id="home" class="h-1/2 px-6 py-16 text-center md:px-20">
      <h1 class="mb-2 text-4xl font-bold">
        Selamat Datang di <br />
        SMP Ibnu Aqil Bogor
      </h1>
      <p class="mb-6 text-gray-700">
        Komitmen kami adalah Ja memberikan pendidikan berkualitas tinggi untuk
        masa depan yang gemilang.
      </p>
      <a
        href="#tentang"
        class="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
        >Pelajari Lebih Lanjut</a
      >
    </section>

    <!-- Tentang -->
    <section id="tentang" class="bg-white px-6 py-10 md:px-20">
      <h2 class="mb-4 text-2xl font-bold">Tentang Sekolah</h2>
      <p class="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </p>
    </section>

    <!-- Program -->
    <section id="program" class="bg-gray-50 px-6 py-10 md:px-20">
      <h2 class="mb-8 text-center text-2xl font-bold">
        Program yang Ditawarkan
      </h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div class="rounded bg-green-600 p-6 text-center text-white shadow">
          <i class="bi bi-book mb-2 inline-block h-10 w-10"></i>
          <h3 class="font-bold">Program Akademik</h3>
        </div>
        <div class="rounded bg-green-600 p-6 text-center text-white shadow">
          <i class="bi bi-mortarboard mb-2 inline-block h-10 w-10"></i>
          <h3 class="font-bold">Program Ekstrakurikuler</h3>
        </div>
        <div class="rounded bg-green-600 p-6 text-center text-white shadow">
          <i class="bi bi-lightbulb mb-2 inline-block h-10 w-10"></i>
          <h3 class="font-bold">Program Kewirausahaan</h3>
        </div>
      </div>
    </section>

    <!-- Berita -->
    <section id="berita" class="px-6 py-10 md:px-20">
      <h2 class="mb-6 text-2xl font-bold">Berita Terbaru</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="i in 3"
          :key="i"
          class="overflow-hidden rounded border shadow-sm"
        >
          <img
            src="https://source.unsplash.com/400x250/?school,student"
            class="h-48 w-full object-cover"
          />
          <div class="p-4">
            <p class="mb-1 text-sm text-gray-500">01 Januari 2024</p>
            <h3 class="mb-2 font-semibold">Judul Berita Terkini</h3>
            <p class="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Kontak -->
    <section id="kontak" class="bg-white px-6 py-10 md:px-20">
      <h2 class="mb-4 text-2xl font-bold">Kontak</h2>
      <p class="text-gray-700">
        Hubungi kami di <strong>example@smpibnuaqil.sch.id</strong>
      </p>
    </section>
  </div>
</template>
