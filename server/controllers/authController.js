import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.js';
import { verifyUser, verifyAdmin } from '../db.js';

export const login = async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body;

        // Verify credentials
        const result = isAdmin 
            ? await verifyAdmin(email, password)
            : await verifyUser(email, password);

        if (result.error) {
            return res.status(401).json({ error: result.error });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: result.user.id,
                email: result.user.email,
                role: result.user.role
            },
            authConfig.jwtSecret,
            { expiresIn: authConfig.jwtExpiration }
        );

        // Set token in HTTP-only cookie
        res.cookie('token', token, authConfig.cookieOptions);

        // Return user info (without sensitive data)
        res.json({
            user: {
                email: result.user.email,
                role: result.user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

export const verifyAuth = (req, res) => {
    // If middleware passed, user is authenticated
    res.json({ 
        user: {
            email: req.user.email,
            role: req.user.role
        }
    });
}; 