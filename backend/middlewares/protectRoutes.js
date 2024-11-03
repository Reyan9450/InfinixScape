import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_Secret; // Use your secret key, preferably store it in environment variables.

export const protect = async (req, res, next) => {
    // Retrieve the JWT from cookies
    let token = req.cookies.jwt; 

    // Check if the token is not present
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret);

        // Find the user based on decoded token
        req.user = await User.findById(decoded.userId).select('-password');

        // If the user is not found, send a 404 response
        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Continue to the next middleware
        next();
    } catch (error) {
        console.error('Error with token verification:', error.message);
        // Send a 401 Unauthorized response with a descriptive message
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token failed',
            error: error.message // Optionally include the error message
        });
    }
};
