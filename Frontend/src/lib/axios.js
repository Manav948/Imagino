import axios from "axios";

// Use environment variable for backend URL, fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === "development" ? "http://localhost:8001" : "https://imagino-iba4.onrender.com");

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default api;