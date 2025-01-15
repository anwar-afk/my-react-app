import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import App from './App'; // Import komponen App

function AppWrapper() {
  return (
    <Router>
      <AuthProvider> {/* Bungkus seluruh aplikasi dengan AuthProvider */}
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;