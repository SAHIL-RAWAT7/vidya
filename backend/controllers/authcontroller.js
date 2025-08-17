// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, goal, experience } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      goal,
      experience
    });

    await newUser.save();

    // Return token + user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        goal: newUser.goal,
        experience: newUser.experience,
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        goal: user.goal,
        experience: user.experience
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Current User
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user; // Set by auth middleware
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      goal: user.goal,
      experience: user.experience
    });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { registerUser, loginUser, getCurrentUser };
