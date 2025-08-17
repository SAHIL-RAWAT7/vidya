// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userData) => {
    const formattedUser = {
      name: userData.name || "",       // ✅ Always present (even if empty)
      email: userData.email || "",
      token: userData.token || "",
    };

    setUser(formattedUser);
    localStorage.setItem("user", JSON.stringify(formattedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook
export const useAuth = () => useContext(AuthContext);
