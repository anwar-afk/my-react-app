import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      if (response.token) {
        authLogin({ username: formData.email, token: response.token });
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Email atau password salah');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section - Left Side */}
      <div className="w-1/2 flex items-center justify-center bg-green-100 p-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Welcome Back!
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username:
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password:
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-500 hover:text-green-600 font-medium">
              Register
            </Link>
          </p>

          <div className="mt-8">
            <div className="flex items-center justify-center space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-green-600 hover:text-green-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2Z"/>
                </svg>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.05 4.23L18.79 17.88C18.58 18.84 17.97 19.09 17.15 18.63L12.04 14.83L9.56 17.31C9.33 17.54 9.13 17.74 8.69 17.74L9 12.63L18.31 4.23C18.69 3.89 18.23 3.7 17.73 4.04L6.08 11.09L0.97 9.45C0.01 9.13 0 8.42 1.19 7.93L20.67 1.13C21.47 0.81 22.19 1.33 21.92 2.55L22.05 4.23Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section - Right Side */}
      <div className="w-1/2 bg-green-400 flex items-center justify-center">
        <img
          src="/image/login.png"
          alt="Login Illustration"
          className="max-w-md"
        />
      </div>
    </div>
  );
};

export default LoginPage;