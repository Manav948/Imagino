import jwt from 'jsonwebtoken'
export const isAuth = (req, res, next) => {
    try {

        const token =
            req.cookies?.token ||
            (req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer') &&
                req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access. Please log in." })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user =  {id: decoded.userID};
        
        next();
    } catch (error) {
        console.log("Authentication Error : ", error);
        return res.status(401).json({ message: "Invalid or expired token" })
    }
} 