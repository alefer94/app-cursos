
import axios from "axios";

const api = axios.create({
  baseURL: "http://161.132.51.131:5000", // URL base de tu API
});

// Interceptor para incluir el token en las cabeceras
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;