// backend/routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/authcontroller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/auth/signup
router.post('/signup', registerUser);

// @route   POST /api/auth/signin
router.post('/signin', loginUser);

// @route   GET /api/auth/me
router.get('/me', protect, getCurrentUser);

export default router;

