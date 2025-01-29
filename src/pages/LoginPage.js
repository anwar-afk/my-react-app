import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before attempting login

    try {
      const response = await login(formData);
      if (response.token) {
        authLogin({
          username: formData.email,
          token: response.token,
          role: response.user.role,
        });
        navigate(response.user.role === 'admin' ? '/admin' : '/');
      } else {
        setError('Email atau password salah');
        alert('Email atau password salah');
      }
    } catch (err) {
      setError(err.message || 'Email atau password salah');
      alert('Email atau password salah');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-green-100 p-6 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">
            Welcome Back!
          </h2>

          {error && (
            <div className="mb-4 text-red-600 text-sm font-medium bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email:
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

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password:
              </label>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <i className="far fa-eye-slash"></i>
                ) : (
                  <i className="far fa-eye"></i>
                )}
              </button>
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
            <Link
              to="/register"
              className="text-green-500 hover:text-green-600 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 bg-green-400 flex items-center justify-center p-6 md:p-0">
        <img
          src="/image/login.png"
          alt="Login Illustration"
          className="max-w-full h-auto md:max-w-md"
        />
      </div>
    </div>
  );
};

export default LoginPage;
