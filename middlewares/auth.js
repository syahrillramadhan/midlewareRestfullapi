import prisma from '../db/db.js';
import Token from '../lib/jwt.js';

class Auth {
    static async authentication(req, res, next) {
        try {
            const token = req.headers.authorization;

            if (!token) return res.status(400).json({
                message: 'Authentication Token Required'
            });

            const accessToken = token.split(' ')[1];

            if (!accessToken) return res.status(401).json({
                message: 'Invalid Token'
            });

            const decoded = Token.verifyToken(accessToken);

            const data = await prisma.users.findUnique({
                where: {
                    id: decoded.id,
                }
            });

            if (!data) return res.status(404).json({
                message: 'Data Not Found'
            });

            req.data = data;

            next();

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }

    static async userAuthorization(req, res, next) {
        try {
            const { id, role } = req.data;
            const targetId = parseInt(req.params.id);

            if (!targetId) return res.status(404).json({
                message: 'Data Not Found',
            });

            if (id !== targetId && role !== 'admin') return res.status(403).json({
                message: 'Access Denied',
            });

            next();

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }

    static async adminAuthorization(req, res, next) {
        try {
            const { role } = req.data;

            if (role !== 'admin') return res.status(403).json({
                message: 'Access Denied'
            });

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
}

export default Auth;