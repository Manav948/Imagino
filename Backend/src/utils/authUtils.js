import crypto from 'crypto';
import bcrypt from 'bcrypt'

export const hashedPassword = async (password) => {
    const saltedPassword = password + process.env.PASSWORD_PEPPER;
    return await bcrypt.hash(saltedPassword, 10);
}
export const comparePasswordWithPaper = async (password, hashedPassword) => {
    const saltedPassword = password + process.env.PASSWORD_PEPPER;
    return await bcrypt.compare(saltedPassword, hashedPassword);
}

export const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}