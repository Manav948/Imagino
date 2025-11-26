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
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", router);
app.use("/api/user/", userRouter)
// Connect DB. In Vercel serverless environment we export the app
// as a handler. Only call `listen` when running locally.
connectDb().then(() => {
    if (!process.env.VERCEL) {
        app.listen(PORT, () => {
            console.log(`The Server running on port no : ${PORT}`);
        })
    } else {
        console.log('Connected to DB (vercel). App exported as serverless handler.');
    }
})

// Export the express app so Vercel's Node builder can use it as a handler.
export default app

// Fallback 404 response with path logged (helps diagnosing route mismatches on Vercel)
app.use((req, res) => {
    console.warn('Unhandled request path in backend:', req.originalUrl);
    res.status(404).json({ message: 'Not Found', path: req.originalUrl });
});
