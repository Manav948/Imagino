import axios from 'axios';

// Use environment variable for backend URL, fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === "development" ? "http://localhost:8001" : "https://imagino-iba4.onrender.com");

export const generateImage = async (prompt, userId) => {
  const res = await axios.post(
    `${BASE_URL}/api/user/generate-image`,
    { prompt, userId }
  );
  return res.data;
};

export const storeImageToHistory = async (prompt, imageUrl,) => {
  const res = await axios.post(
    `${BASE_URL}/api/user/store-image`,
    { prompt, imageUrl }
  );
  return res.data;
};
