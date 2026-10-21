import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';

/**
 * Lazily ensure Cloudinary is configured with latest environment variables.
 * This prevents issues where ES modules hoist imports before dotenv.config() runs.
 */
export const ensureCloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
};

/**
 * Upload an in-memory buffer directly to Cloudinary via upload stream
 * @param {Buffer} buffer
 * @param {Object} [options]
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadBufferToCloudinary = (buffer, options = {}) => {
  ensureCloudinaryConfig();
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'imagino/history',
        resource_type: 'image',
        ...options,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary buffer upload error:', error);
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

/**
 * Upload a local file to Cloudinary and unlink it afterwards
 * @param {string} filepath
 * @param {Object} [options]
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadFileToCloudinary = async (filepath, options = {}) => {
  ensureCloudinaryConfig();
  try {
    const uploadResult = await cloudinary.uploader.upload(filepath, {
      folder: 'imagino/history',
      resource_type: 'image',
      ...options,
    });
    return uploadResult;
  } catch (error) {
    console.error('Cloudinary file upload error:', error);
    throw new Error('Failed to upload image');
  } finally {
    await fs.unlink(filepath).catch(() => {});
  }
};

/**
 * Delete an asset from Cloudinary
 * @param {string} publicId
 * @returns {Promise<Object>}
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return { result: 'not_found' };
  ensureCloudinaryConfig();
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res;
  } catch (error) {
    console.error(`Error deleting asset ${publicId} from Cloudinary:`, error);
    throw error;
  }
};

/**
 * Backward compatibility wrapper for legacy callers
 * (e.g., controller.js calling `await cloudinaryConfig(filepath)`)
 */
const cloudinaryConfig = async (filepath, options = {}) => {
  const result = await uploadFileToCloudinary(filepath, options);
  return result.secure_url;
};

cloudinaryConfig.uploadBuffer = uploadBufferToCloudinary;
cloudinaryConfig.uploadFile = uploadFileToCloudinary;
cloudinaryConfig.deleteAsset = deleteFromCloudinary;
cloudinaryConfig.cloudinary = cloudinary;
cloudinaryConfig.ensureConfig = ensureCloudinaryConfig;

export { cloudinary };
export default cloudinaryConfig;
