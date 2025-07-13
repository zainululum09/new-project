// src/api/wilayah.js
import axios from "axios";

const API_BASE = "http://localhost/datasmp/wilayah";

export function getProvinces() {
  return axios.get(`${API_BASE}/getProvinces`);
}

export function getRegencies(provinceCode) {
  return axios.get(`${API_BASE}/getRegencies/${provinceCode}`);
}

export function getDistricts(regencyCode) {
  return axios.get(`${API_BASE}/getDistricts/${regencyCode}`);
}

export function getVillages(districtCode) {
  return axios.get(`${API_BASE}/getVillages/${districtCode}`);
}
