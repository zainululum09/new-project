import { ref } from "vue";

const alert = ref({
  show: false,
  message: "",
  type: "success", // bisa: success | error | info
});

const showAlert = (message, type = "success", duration = 3000) => {
  alert.value = { show: true, message, type };
  setTimeout(() => {
    alert.value.show = false;
  }, duration);
};

export function useAlert() {
  return { alert, showAlert };
}
