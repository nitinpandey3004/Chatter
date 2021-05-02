import jwt from 'jsonwebtoken';
// models
import UserModel from '../models/User.js';

const SECRET_KEY = 'some-secret-key1';

export const encode = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.getUserForLogin(email, password);
        const payload = {
            userId: user._id,
            userType: user.type,
            email: user.email,
            name: user.firstName,
        };
        const authToken = jwt.sign(payload, SECRET_KEY);
        // console.log('Auth', authToken);
        req.authToken = authToken;
        req.userId = user._id;
        req.email = user.email;
        req.name = user.firstName;
        next();
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.error
        })
    }
}

export const decode = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        req.userId = decoded.userId;
        req.userType = decoded.type;
        req.email = decoded.email;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

export const decodeToken = async(accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw error;
    }
}