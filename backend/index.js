// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js'; // 🔹 Added

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// backend/app.js or server.js
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
  credentials: true
}));
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/subscribe', subscriptionRoutes); // 🔹 Added

// Health Check Route
app.get('/', (req, res) => {
  res.send('✅ FitTrack backend is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
