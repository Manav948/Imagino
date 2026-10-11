import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import connectDb from './src/config/db.js'
import router from './src/routes/AuthRoute.js'
import userRouter from './src/routes/UserRoute.js'
import cors from 'cors'
import helmet from 'helmet'
import { globalRateLimit } from './src/middleware/rateLimit.js'
import { isAllowedOrigin } from './src/config/origins.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet());
app.use(globalRateLimit);
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin(origin, callback) {
        // Requests without Origin are non-browser requests (health checks, etc.).
        if (!origin || isAllowedOrigin(origin)) return callback(null, true);
        return callback(new Error('Origin is not allowed by CORS'));
    },
    credentials: true,
}));

app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use("/api/auth/", router);
app.use("/api/user/", userRouter)

app.use((error, req, res, next) => {
    if (error?.message === 'Origin is not allowed by CORS') {
        return res.status(403).json({ message: 'Origin is not allowed.' });
    }

    if (error?.name === 'MulterError' || error?.message === 'Only JPEG, PNG, WebP, and GIF images are allowed.') {
        return res.status(400).json({ message: error.message });
    }

    console.error('Unhandled request error:', error);
    return res.status(500).json({ message: 'Internal server error' });
});

// Connect DB and start server
connectDb().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});
