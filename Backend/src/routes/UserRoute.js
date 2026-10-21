import express from 'express';
import { getUserProfile, canGenerateImage, storeImage, getImage } from '../controller/userController.js';
import {
  saveHistoryImage,
  getHistory,
  getHistoryById,
  deleteHistoryImage,
} from '../controller/historyController.js';
import { uploaderController } from '../controller/controller.js';
import { isAuth } from '../middleware/isAuth.js';
import { generateImage } from '../controller/imageGenerate.js';
import upload, { uploadMemory } from '../middleware/multer.js';
import { generateImageSchema, validateRequest } from '../middleware/validation.js';

const router = express.Router();

// User profile & Generation checks
router.get('/profile', isAuth, getUserProfile);
router.get('/can-genetrate', isAuth, canGenerateImage);
router.post('/generate-image', isAuth, validateRequest(generateImageSchema), generateImage);

// Image History CRUD endpoints
router.get('/history', isAuth, getHistory);
router.post('/history', isAuth, uploadMemory.single('image'), saveHistoryImage);
router.get('/history/:id', isAuth, getHistoryById);
router.delete('/history/:id', isAuth, deleteHistoryImage);

// Legacy compatibility routes
router.post('/store-image', isAuth, storeImage);
router.get('/images', isAuth, getImage);
router.post('/legacy-upload', isAuth, upload.single('image'), uploaderController);

export default router;
