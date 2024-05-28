import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Token {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.SECRET_KEY);
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            throw new Error(error, 'Invalid Token')
        }
    }
}

export default Token;