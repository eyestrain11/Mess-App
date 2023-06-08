import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../User/Models/User.js';

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    jwt.verify(
        token,
        process.env.AUTH_TOKEN,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            const foundUser = await User.findOne({ "email": decoded.useremail }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized : no user found' });
            next();
        })
    )
});

export { protect };