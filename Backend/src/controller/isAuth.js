import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Session from '../models/sessionModel.js';
import { generateAccessToken, generateRefreshToken, setRefreshTokenCookie } from '../config/token.js';
import { comparePasswordWithPaper, hashedPassword, hashToken } from '../utils/authUtils.js';

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const hashPassword = await hashedPassword(password);
        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashPassword
        });

        await user.save();

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const tokenHash = hashToken(refreshToken);
        const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await Session.create({
            userId: user._id,
            tokenHash,
            ipAddress: req.ip || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown',
            expireAt
        });

        setRefreshTokenCookie(res, refreshToken);

        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully.',
            token: accessToken,
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.log('Error in signUp function :', error);
        res.status(500).json({ message: 'Internal server Error' });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({ message: 'Email does not exist' });
        }

        if (user.isLocked()) {
            const lockTimeRemaining = Math.ceil((user.lockuntil - Date.now()) / 1000 / 60);
            return res.status(423).json({
                message: `Account is locked due to multiple failed login attempts. Please try again after ${lockTimeRemaining} minutes.`
            });
        }

        const validPassword = await comparePasswordWithPaper(password, user.password);

        if (!validPassword) {
            user.loginAttempts += 1;
            if (user.loginAttempts >= 5) {
                user.lockuntil = new Date(Date.now() + 15 * 60 * 1000);
            }
            await user.save();
            return res.status(401).json({ message: 'Invalid password' });
        }

        user.loginAttempts = 0;
        user.lockuntil = undefined;
        await user.save();

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const tokenHash = hashToken(refreshToken);
        const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await Session.create({
            userId: user._id,
            tokenHash,
            ipAddress: req.ip || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown',
            expireAt
        });

        setRefreshTokenCookie(res, refreshToken);

        return res.status(200).json({
            status: 'success',
            message: 'Signed in successfully.',
            token: accessToken,
            user: {
                userId: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.log('Error in signIn function :', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token not found' });
        }

        const tokenHash = hashToken(refreshToken);
        await Session.deleteOne({ tokenHash });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
        console.log('Error in logout function : ', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const refreshSession = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token not found' });
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid or expired refresh token.'
            });
        }

        const tokenHash = hashToken(refreshToken);
        const session = await Session.findOne({ tokenHash });

        if (!session || !session.isValid || new Date() > session.expireAt) {
            if (session) {
                await Session.deleteOne({ _id: session._id });
            } else {
                await Session.deleteMany({ userId: decoded.userId });
            }
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            return res.status(401).json({
                status: 'fail',
                message: 'Session is no longer valid. Please log in again.'
            });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User no longer exists. Please sign in again.'
            });
        }

        if (user.isLocked()) {
            return res.status(423).json({
                status: 'fail',
                message: 'User account is locked.'
            });
        }

        await Session.deleteOne({ _id: session._id });
        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        const newTokenHash = hashToken(newRefreshToken);
        const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await Session.create({
            userId: user._id,
            tokenHash: newTokenHash,
            ipAddress: req.ip || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown',
            expireAt
        });
        setRefreshTokenCookie(res, newRefreshToken);

        return res.status(200).json({
            status: 'success',
            token: accessToken
        });
    } catch (error) {
        console.log('Error in refreshSession function : ', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};