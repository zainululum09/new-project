import axios from "axios";

const API_URL = "http://localhost/datasmp";

// Helper untuk set Authorization header jika token ada
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Endpoint siswa
export function getAllSiswa() {
  return axios.get(`${API_URL}/siswa`, authHeader());
}

export function getSiswaById(id) {
  return axios.get(`${API_URL}/siswa/show/${id}`, authHeader());
}

export function tambahSiswa(data) {
  return axios.post(`${API_URL}/siswa/store`, data, authHeader());
}

export function updateSiswa(id, data) {
  return axios.put(`${API_URL}/siswa/update/${id}`, data, authHeader());
}

export function deleteSiswaById(id) {
  return axios.delete(`${API_URL}/siswa/delete/${id}`, authHeader());
}
