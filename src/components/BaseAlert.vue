<template>
  <Transition name="fade-slide">
    <div
      v-if="alert.show"
      class="fixed left-1/2 top-6 z-50 w-[90%] max-w-sm -translate-x-1/2 transform rounded-lg border-l-4 p-4 shadow-md"
      :class="{
        'border-green-500 bg-green-100 text-green-700':
          alert.type === 'success',
        'border-red-500 bg-red-100 text-red-700': alert.type === 'error',
        'border-blue-500 bg-blue-100 text-blue-700': alert.type === 'info',
      }"
    >
      <p class="text-center font-semibold">{{ alert.message }}</p>
    </div>
  </Transition>
</template>

<script setup>
import { useAlert } from "./useAlert";
const { alert } = useAlert();
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
