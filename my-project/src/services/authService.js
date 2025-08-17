// src/services/authService.js
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api/auth';

export const signup = async (userData) => {
  const response = await axios.post(`${API}/signup`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const signin = async (credentials) => {
  const response = await axios.post(`${API}/signin`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const signout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};
