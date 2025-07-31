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
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", router);
app.use("/api/user/", userRouter)
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`The Server running on port no : ${PORT}`);
    })
})
