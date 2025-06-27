import axios from "axios";

const API_URL = "http://localhost/datasmp";

export function login(username, password) {
  return axios.post(`${API_URL}/login/login`, { username, password });
}

export function logout() {
  localStorage.removeItem("token");
}
