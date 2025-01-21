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
      console.log('Response from login:', response); // Debugging: Lihat response
      if (response.token) {
        authLogin({ 
          username: formData.email, 
          token: response.token, 
          role: response.user.role // Ambil role dari response.user.role
        });
        if (response.user.role === 'admin') {
          navigate('/admin'); // Arahkan ke halaman admin jika role adalah admin
        } else {
          navigate('/'); // Arahkan ke halaman utama jika role adalah user
        }
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