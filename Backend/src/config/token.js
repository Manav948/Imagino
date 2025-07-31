import jwt from "jsonwebtoken";
export const generateToken = (user) => {
    try {
        const payload = { userId: user._id }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
    } catch (error) {
        console.log("Error in Genereate token function : ", error);
        return null;
    }
}

