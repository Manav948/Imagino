import multer from "multer";
import path from 'node:path';
import crypto from 'node:crypto';

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, `${crypto.randomUUID()}${extension}`);
    }
})
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    fileFilter: (req, file, cb) => {
        if (!allowedMimeTypes.has(file.mimetype)) {
            return cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed.'));
        }
        cb(null, true);
    },
});
export default upload
