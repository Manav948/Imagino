import mongoose from 'mongoose';
import GeneratedImage from '../models/generatedImage.js';
import User from '../models/user.js';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { validateImageBuffer } from '../utils/imageValidation.js';

const ALLOWED_ASPECT_RATIOS = new Set(['1:1', '16:9', '9:16', 'custom']);

/**
 * Save a newly generated image to the user's permanent history.
 * Supports multipart image file upload or JSON data.
 */
export const saveHistoryImage = async (req, res) => {
  let uploadedPublicId = null;

  try {
    const userId = req.user.id;
    const prompt = (req.body.prompt || '').trim();

    if (!prompt) {
      return res.status(400).json({
        status: 'fail',
        message: 'Prompt is required to save image to history.',
      });
    }

    if (prompt.length > 1000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Prompt cannot exceed 1000 characters.',
      });
    }

    const clientGenerationId = req.body.clientGenerationId
      ? String(req.body.clientGenerationId).trim()
      : null;

    // Idempotency check: if clientGenerationId already persisted for this user, return existing record
    if (clientGenerationId) {
      const existing = await GeneratedImage.findOne({
        userId,
        clientGenerationId,
      });

      if (existing) {
        return res.status(200).json({
          status: 'success',
          message: 'Image already saved in history',
          data: { image: existing },
        });
      }
    }

    let finalImageUrl = null;
    let finalPublicId = '';
    let finalWidth = null;
    let finalHeight = null;

    // Case 1: Image provided as uploaded file buffer
    if (req.file && req.file.buffer) {
      const validation = validateImageBuffer(req.file.buffer);
      if (!validation.valid) {
        return res.status(400).json({
          status: 'fail',
          message: validation.reason || 'Invalid image content',
        });
      }

      const uploadResult = await uploadBufferToCloudinary(req.file.buffer, {
        folder: 'imagino/history',
      });

      finalImageUrl = uploadResult.secure_url;
      finalPublicId = uploadResult.public_id;
      uploadedPublicId = uploadResult.public_id;
      finalWidth = uploadResult.width || null;
      finalHeight = uploadResult.height || null;
    }
    // Case 2: Image provided as Base64 data URL in req.body.imageUrl
    else if (req.body.imageUrl && req.body.imageUrl.startsWith('data:image/')) {
      const matches = req.body.imageUrl.match(/^data:image\/[a-zA-Z0-9.+]+;base64,(.+)$/);
      if (!matches || !matches[1]) {
        return res.status(400).json({
          status: 'fail',
          message: 'Invalid base64 image data URL.',
        });
      }

      const buffer = Buffer.from(matches[1], 'base64');
      const validation = validateImageBuffer(buffer);
      if (!validation.valid) {
        return res.status(400).json({
          status: 'fail',
          message: validation.reason || 'Invalid image content in base64 payload',
        });
      }

      const uploadResult = await uploadBufferToCloudinary(buffer, {
        folder: 'imagino/history',
      });

      finalImageUrl = uploadResult.secure_url;
      finalPublicId = uploadResult.public_id;
      uploadedPublicId = uploadResult.public_id;
      finalWidth = uploadResult.width || null;
      finalHeight = uploadResult.height || null;
    }
    // Case 3: Already hosted secure URL (e.g. legacy Cloudinary URL)
    else if (req.body.imageUrl && (req.body.imageUrl.startsWith('http://') || req.body.imageUrl.startsWith('https://'))) {
      finalImageUrl = req.body.imageUrl.trim();
      finalPublicId = req.body.publicId ? String(req.body.publicId).trim() : '';
      finalWidth = req.body.width ? Number(req.body.width) : null;
      finalHeight = req.body.height ? Number(req.body.height) : null;
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'No valid image file or image URL provided.',
      });
    }

    const aspectRatio = ALLOWED_ASPECT_RATIOS.has(req.body.aspectRatio)
      ? req.body.aspectRatio
      : '1:1';

    const sampler = req.body.sampler ? String(req.body.sampler).trim() : 'Euler a';
    const steps = req.body.steps ? Math.max(10, Math.min(100, parseInt(req.body.steps, 10) || 30)) : 30;
    const cfgScale = req.body.cfgScale ? Math.max(1, Math.min(15, parseFloat(req.body.cfgScale) || 7.5)) : 7.5;

    // Create MongoDB document
    const newImage = new GeneratedImage({
      userId,
      prompt,
      imageUrl: finalImageUrl,
      publicId: finalPublicId,
      width: finalWidth,
      height: finalHeight,
      aspectRatio,
      sampler,
      steps,
      cfgScale,
      clientGenerationId,
    });

    try {
      await newImage.save();
    } catch (dbError) {
      // If saving to DB fails, clean up the uploaded Cloudinary asset so we don't leave orphaned files
      if (uploadedPublicId) {
        await deleteFromCloudinary(uploadedPublicId).catch((cleanupErr) => {
          console.error(`Orphan cleanup error for ${uploadedPublicId}:`, cleanupErr.message);
        });
      }
      throw dbError;
    }

    // Backward compatibility: keep user.generatedImages loosely synchronized
    User.findByIdAndUpdate(userId, {
      $push: {
        generatedImages: {
          $each: [{ prompt, imageUrl: finalImageUrl, createdAt: newImage.createdAt }],
          $slice: -50, // Keep only last 50 embedded to prevent unbounded growth
        },
      },
    }).catch(() => {});

    return res.status(201).json({
      status: 'success',
      message: 'Image saved to history successfully',
      data: { image: newImage },
    });
  } catch (error) {
    console.error('Error in saveHistoryImage:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to save image to history. Please try again.',
    });
  }
};

/**
 * Get paginated image generation history for the authenticated user.
 */
export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Parse and sanitize query parameters
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 12));
    const search = (req.query.search || '').trim();
    const aspectRatio = (req.query.aspectRatio || '').trim();

    // Check for legacy embedded images migration if collection has 0 items
    if (page === 1 && !search && !aspectRatio) {
      const currentCount = await GeneratedImage.countDocuments({ userId });
      if (currentCount === 0) {
        const user = await User.findById(userId).lean();
        if (user && Array.isArray(user.generatedImages) && user.generatedImages.length > 0) {
          const migrationDocs = user.generatedImages
            .filter((img) => img && img.imageUrl && !img.imageUrl.startsWith('data:'))
            .map((img) => ({
              userId,
              prompt: img.prompt || 'Generated Creation',
              imageUrl: img.imageUrl,
              createdAt: img.createdAt || new Date(),
              aspectRatio: '1:1',
            }));

          if (migrationDocs.length > 0) {
            await GeneratedImage.insertMany(migrationDocs).catch((err) => {
              console.error('Legacy migration warning:', err.message);
            });
          }
        }
      }
    }

    const filter = { userId };

    if (search) {
      // Escape special regex characters to prevent regex injection
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.prompt = { $regex: escaped, $options: 'i' };
    }

    if (aspectRatio && ALLOWED_ASPECT_RATIOS.has(aspectRatio)) {
      filter.aspectRatio = aspectRatio;
    }

    const [totalImages, images] = await Promise.all([
      GeneratedImage.countDocuments(filter),
      GeneratedImage.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(totalImages / limit) || 1;
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return res.status(200).json({
      status: 'success',
      data: {
        images,
        pagination: {
          page,
          limit,
          totalImages,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
      },
    });
  } catch (error) {
    console.error('Error in getHistory:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve image history',
    });
  }
};

/**
 * Get a single image record by ID, verifying ownership.
 */
export const getHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid image ID format',
      });
    }

    const image = await GeneratedImage.findById(id).lean();

    if (!image) {
      return res.status(404).json({
        status: 'fail',
        message: 'Image record not found',
      });
    }

    if (image.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'Access denied to this image record',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: { image },
    });
  } catch (error) {
    console.error('Error in getHistoryById:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve image record',
    });
  }
};

/**
 * Delete an image record from MongoDB and Cloudinary, verifying ownership.
 */
export const deleteHistoryImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid image ID format',
      });
    }

    const image = await GeneratedImage.findById(id);

    if (!image) {
      return res.status(404).json({
        status: 'fail',
        message: 'Image record not found',
      });
    }

    if (image.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to delete this image',
      });
    }

    // Attempt to delete Cloudinary asset if publicId is recorded
    if (image.publicId) {
      try {
        await deleteFromCloudinary(image.publicId);
      } catch (cloudErr) {
        // Log Cloudinary deletion failure, but proceed with DB deletion so user is not stuck
        console.warn(`Cloudinary asset deletion warning for ${image.publicId}:`, cloudErr.message);
      }
    }

    // Delete MongoDB record
    await GeneratedImage.findByIdAndDelete(id);

    // Also pull from legacy user.generatedImages if present
    User.findByIdAndUpdate(req.user.id, {
      $pull: { generatedImages: { imageUrl: image.imageUrl } },
    }).catch(() => {});

    return res.status(200).json({
      status: 'success',
      message: 'Image deleted successfully from history',
      data: { id },
    });
  } catch (error) {
    console.error('Error in deleteHistoryImage:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete image record',
    });
  }
};
