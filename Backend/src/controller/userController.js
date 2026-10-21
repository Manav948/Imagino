import User from '../models/user.js';
import GeneratedImage from '../models/generatedImage.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserProfile function:', error);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};

export const canGenerateImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const limit = user.maxImageLimit || 10;
    if (user.imageCount >= limit) {
      return res.status(403).json({ message: 'Max Limit Reached' });
    }
    return res.status(200).json({ message: 'allowed', remaining: limit - user.imageCount });
  } catch (error) {
    console.error('Error in canGenerateImage function:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Backward compatibility: storeImage now stores in GeneratedImage collection
 * as well as keeping user.generatedImages updated.
 */
export const storeImage = async (req, res) => {
  const { prompt, imageUrl } = req.body;
  try {
    if (!prompt || !imageUrl) {
      return res.status(400).json({ message: 'Prompt and imageUrl are required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Persist to GeneratedImage collection
    const generatedRecord = await GeneratedImage.create({
      userId: user._id,
      prompt,
      imageUrl,
      createdAt: new Date(),
    });

    user.generatedImages.push({ prompt, imageUrl, createdAt: generatedRecord.createdAt });
    if (user.generatedImages.length > 50) {
      user.generatedImages = user.generatedImages.slice(-50);
    }
    await user.save();

    return res.status(200).json({
      message: 'save',
      data: generatedRecord,
    });
  } catch (error) {
    console.error('Error in storeImage function:', error);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};

/**
 * Backward compatibility: getImage fetches from GeneratedImage collection
 * (falling back to user.generatedImages if empty).
 */
export const getImage = async (req, res) => {
  try {
    const images = await GeneratedImage.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    if (images.length > 0) {
      return res.status(200).json({ images });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ images: user.generatedImages || [] });
  } catch (error) {
    console.error('Error in getImage Function:', error);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};