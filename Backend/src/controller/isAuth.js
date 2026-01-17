import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../config/token.js';
export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "user already exist" });
        }

        if (password.length < 6) {
            return res.status(400).json({ messsage: "password must be 6 digit" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
        })
        const token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: false,
            sameSite: 'Lax'
        })
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.log("errror in signUp function :", error);
        res.status(500).json({ message: "Internal server Error" });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 60 * 60 * 1000,
            secure: false,
            sameSite: 'Lax'
        })
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in singIn function :", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "logout successfully" })
    } catch (error) {
        console.log("Error in logout function : ", error);
        return res.status(500).json({ message: "internal server error" })
    }
}