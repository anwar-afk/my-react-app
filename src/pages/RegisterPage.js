import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat registrasi');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex bg-green-50">
      {/* Left Section: Illustration */}
      <div className="w-1/2 bg-green-50 flex items-center justify-center relative">
        <img
          src="/image/register-image.png" // Replace with your illustration path
          alt="Register Illustration"
          className="max-w-full h-auto"
          style={{ height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Right Section: Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Please Fill out form to Register!
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-green-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-green-500 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-green-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-green-500 focus:outline-none"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-green-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 focus:ring focus:ring-green-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Yes I have an account?{' '}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#facebook" className="text-blue-600">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#whatsapp" className="text-green-600">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="#telegram" className="text-blue-400">
            <i className="fab fa-telegram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;