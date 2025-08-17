// routes/workoutRoutes.js
import express from 'express';
import {
  getDashboardStats,
  getRecentWorkouts,
  createWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
  getWorkoutById
} from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Dashboard-specific routes
router.get('/dashboard', protect, getDashboardStats);
router.get('/recent', protect, getRecentWorkouts);

// CRUD operations
router.route('/')
  .post(protect, createWorkout)
  .get(protect, getWorkouts);

router.route('/:id')
  .get(protect, getWorkoutById)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

export default router;