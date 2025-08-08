import axios from 'axios';

export const generateImage = async (prompt, userId) => {
  const res = await axios.post(
    "http://localhost:8001/api/user/generate-image",
    { prompt, userId },
    { withCredentials: true }
  );
  return res.data;
};

export const storeImageToHistory = async (prompt, imageUrl,) => {
  const res = await axios.post(
    `http://localhost:8001/api/user/store-image`,
    { prompt, imageUrl },
    {
      withCredentials: true
    }
  );
  return res.data;
};
