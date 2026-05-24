import jwt from 'jsonwebtoken'
import User from '../models/user.js';

export const isAuth = async(req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ status: 'fail', message: "Unauthorized access. Please log in." })
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    status: 'fail',
                    message: "AccessToken expired. Please refresh Your Sesssion."
                })
            }
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid Access token. Please log in again.'
            })
        }
        const currentUser = await User.findById(decoded.userId);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: "The user session no longer exists."
            })
        }
        // Token payload contains `userId` (see `src/config/token.js`), use that consistently
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        console.log("Authentication Error : ", error);
        return res.status(401).json({ message: "Invalid or expired token" })
    }
} 