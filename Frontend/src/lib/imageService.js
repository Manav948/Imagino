import api from './axios.js';

export const generateImage = async (prompt, userId) => {
  const res = await api.post(
    '/api/user/generate-image',
    { prompt, userId }
  );
  return res.data;
};

export const storeImageToHistory = async (prompt, imageUrl,) => {
  const res = await api.post(
    '/api/user/store-image',
    { prompt, imageUrl }
  );
  return res.data;
};
