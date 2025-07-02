import express from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Mock user data - replace with your database
const users = [
  { id: 1, email: 'yonas.mersha14@gmail.com', password: 'user123', role: 'user' },
  { id: 2, email: 'yonas.yigezu@un.org', password: 'admin123', role: 'admin' }
];

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      authConfig.jwtSecret,
      { expiresIn: authConfig.jwtExpiration }
    );
    
    res.cookie('token', token, authConfig.cookieOptions);
    
    res.json({ 
      user: {
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/verify', verifyToken, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

export { router }; 