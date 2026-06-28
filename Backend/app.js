import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import connectDb from './src/config/db.js'
import router from './src/routes/AuthRoute.js'
import userRouter from './src/routes/UserRoute.js'
import cors from 'cors'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000
app.use(express.urlencoded({ extended: true }))
const allowedOrigins = ["http://localhost:5173", "https://imagino.manavvalani.in"];

if (process.env.FRONTEND_URL) {
    process.env.FRONTEND_URL.split(',').forEach(url => {
        const cleanUrl = url.trim().replace(/\/$/, "");
        if (cleanUrl && !allowedOrigins.includes(cleanUrl)) {
            allowedOrigins.push(cleanUrl);
        }
    });
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", router);
app.use("/api/user/", userRouter)

// Connect DB and start server
connectDb().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});