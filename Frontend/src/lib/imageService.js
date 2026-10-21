import api from './axios.js';

/**
 * Request text-to-image generation from the backend provider.
 * @param {string} prompt
 * @param {Object} [options]
 * @returns {Promise<{ message: string, imageCount: number, resultImage: string }>}
 */
export const generateImage = async (prompt, options = {}) => {
  const res = await api.post('/api/user/generate-image', {
    prompt,
    ...options,
  });
  return res.data;
};

/**
 * Persist a newly generated image and its metadata into Cloudinary and MongoDB history.
 * Supports multipart FormData with image blob, or JSON payload if imageUrl already exists.
 *
 * @param {Object} params
 * @param {Blob|File} [params.imageBlob]
 * @param {string} [params.imageUrl]
 * @param {string} params.prompt
 * @param {string} [params.aspectRatio]
 * @param {number} [params.cfgScale]
 * @param {number} [params.steps]
 * @param {string} [params.sampler]
 * @param {string} [params.clientGenerationId]
 * @returns {Promise<Object>} Persisted image record
 */
export const saveImageToHistory = async ({
  imageBlob,
  imageUrl,
  prompt,
  aspectRatio = '1:1',
  cfgScale = 7.5,
  steps = 30,
  sampler = 'Euler a',
  clientGenerationId,
}) => {
  if (imageBlob) {
    const formData = new FormData();
    formData.append('image', imageBlob, `generation_${Date.now()}.png`);
    formData.append('prompt', prompt);
    formData.append('aspectRatio', aspectRatio);
    formData.append('cfgScale', String(cfgScale));
    formData.append('steps', String(steps));
    formData.append('sampler', sampler);
    if (clientGenerationId) {
      formData.append('clientGenerationId', clientGenerationId);
    }

    const res = await api.post('/api/user/history', formData);
    return res.data;
  }

  // Fallback for JSON imageUrl payload
  const res = await api.post('/api/user/history', {
    imageUrl,
    prompt,
    aspectRatio,
    cfgScale,
    steps,
    sampler,
    clientGenerationId,
  });
  return res.data;
};

/**
 * Fetch paginated image history for the authenticated user.
 * Supports pagination, text search, aspect ratio filtering, and AbortSignal.
 *
 * @param {Object} [params]
 * @param {number} [params.page=1]
 * @param {number} [params.limit=12]
 * @param {string} [params.search='']
 * @param {string} [params.aspectRatio='']
 * @param {AbortSignal} [params.signal]
 * @returns {Promise<{ status: string, data: { images: Array, pagination: Object } }>}
 */
export const fetchImageHistory = async ({
  page = 1,
  limit = 12,
  search = '',
  aspectRatio = '',
  signal,
} = {}) => {
  const params = { page, limit };
  if (search && search.trim()) params.search = search.trim();
  if (aspectRatio && aspectRatio !== 'all') params.aspectRatio = aspectRatio;

  const res = await api.get('/api/user/history', {
    params,
    signal,
  });
  return res.data;
};

/**
 * Fetch a single image history record by ID.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const fetchImageById = async (id) => {
  const res = await api.get(`/api/user/history/${id}`);
  return res.data;
};

/**
 * Delete an image record from persistent history and Cloudinary.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const deleteImageFromHistory = async (id) => {
  const res = await api.delete(`/api/user/history/${id}`);
  return res.data;
};

/**
 * Check if the authenticated user has generation credits remaining.
 * @returns {Promise<{ message: string, remaining?: number }>}
 */
export const checkCanGenerate = async () => {
  const res = await api.get('/api/user/can-genetrate');
  return res.data;
};

/**
 * Legacy compatibility method for storing image
 */
export const storeImageToHistory = async (prompt, imageUrl) => {
  const res = await api.post('/api/user/store-image', { prompt, imageUrl });
  return res.data;
};
