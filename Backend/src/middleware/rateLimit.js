import rateLimit from "express-rate-limit";

export const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max : 200,
    standardHeaders : true,
    legacyHeaders : false,
    message : "Too many requests from this IP, please try again after 15 minutes"
})

export const authRateLimit = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 10,
    standardHeaders : true,
    legacyHeaders : false,
    message : "Too many login attempts from this IP, please try again after 15 minutes"
})