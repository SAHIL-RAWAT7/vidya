// src/services/videoService.js
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api/videos';

// Fetch all workout videos
export const fetchVideos = async () => {
  const response = await axios.get(`${API}`);
  return response.data;
};

// Fetch a single video by ID
export const getVideoById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};

// Upload a new workout video (optional)
export const uploadVideo = async (videoData, token) => {
  const response = await axios.post(`${API}`, videoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
