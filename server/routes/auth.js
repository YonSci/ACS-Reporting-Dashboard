import express from 'express';
import { body } from 'express-validator';
import { login, logout, verifyAuth } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

// Routes
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/verify', verifyToken, verifyAuth);

export default router; 