import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Fungsi untuk login
  const login = (userData) => {
    setUser(userData);
    setLastInteraction(Date.now()); // Set waktu terakhir interaksi
    localStorage.setItem('token', userData.token);
  };

  // Fungsi untuk logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Cek session timeout setiap 1 menit
  useEffect(() => {
    const checkSession = setInterval(() => {
      const now = Date.now();
      const timeSinceLastInteraction = now - lastInteraction;

      // Jika lebih dari 30 menit, logout
      if (timeSinceLastInteraction > 30 * 60 * 1000) {
        logout();
      }
    }, 60 * 1000); // Cek setiap 1 menit

    return () => clearInterval(checkSession); // Bersihkan interval saat komponen unmount
  }, [lastInteraction]);

  // Update waktu terakhir interaksi
  const updateLastInteraction = () => {
    setLastInteraction(Date.now());
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateLastInteraction }}>
      {children}
    </AuthContext.Provider>
  );
};