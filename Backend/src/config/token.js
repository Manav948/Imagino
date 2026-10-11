import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    try {
        const payload = { userId: user._id };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    } catch (error) {
        console.log("Error in generateAccessToken function : ", error);
        return null;
    }
};

export const generateRefreshToken = (user) => {
    try {
        const payload = { userId: user._id };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    } catch (error) {
        console.log("Error in generateRefreshToken function : ", error);
        return null;
    }
};

export const setRefreshTokenCookie = (res, token) => {
    const expire = 7 * 24 * 60 * 60 * 1000;
    res.cookie('refreshToken', token, {
        httpOnly: true,
        // Cross-site frontend/API deployments require None; it must always be Secure.
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/api/auth',
        maxAge: expire
    });
};

export const clearRefreshTokenCookie = (res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/api/auth',
    });
};
