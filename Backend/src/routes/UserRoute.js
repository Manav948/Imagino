import express from 'express'
import { getUserProfile, canGenerateImage, storeImage, getImage } from '../controller/userController.js'
import { isAuth } from '../middleware/isAuth.js';
import { generateImage } from '../controller/imageGenerate.js';
const router = express.Router();

router.get('/profile', isAuth, getUserProfile)
router.get('/can-genetrate', isAuth, canGenerateImage)
router.post('/store-image', isAuth, storeImage)
router.get('/images', isAuth, getImage)
router.post('/generate-image', isAuth, generateImage)
export default router;