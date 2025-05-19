import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat registrasi");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen min-h-screen flex flex-col md:flex-row bg-green-50">
      {/* Image Section */}
      <div className="w-full md:w-1/2 bg-green-50 flex items-stretch justify-center p-0 m-0">
        <img
          src="/image/register-image.png"
          alt="Register Illustration"
          className="w-full h-full max-w-xl object-contain md:rounded-none m-0"
          style={{
            height: "100vh",
            minHeight: "100vh",
            maxHeight: "100vh",
            marginTop: 0,
            marginRight: 0,
          }}
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring focus:ring-green-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring focus:ring-green-500 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring focus:ring-green-500 focus:outline-none"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring focus:ring-green-500 focus:border-green-500 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-sm leading-5 focus:outline-none bg-transparent"
              tabIndex={-1}
              aria-label={
                showPassword ? "Sembunyikan password" : "Lihat password"
              }
            >
              {!showPassword ? (
                // Eye-off SVG (tertutup)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 15.272 7.05 19.5 12 19.5c1.772 0 3.432-.457 4.899-1.277m2.121-1.636A10.45 10.45 0 0022.066 12c-1.292-3.271-5.116-7.5-10.066-7.5-1.07 0-2.104.154-3.09.44"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                // Eye SVG (terbuka)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="relative mt-4">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring focus:ring-green-500 focus:border-green-500 focus:outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-sm leading-5 focus:outline-none bg-transparent"
              tabIndex={-1}
              aria-label={
                showConfirmPassword ? "Sembunyikan password" : "Lihat password"
              }
            >
              {!showConfirmPassword ? (
                // Eye-off SVG (tertutup)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 15.272 7.05 19.5 12 19.5c1.772 0 3.432-.457 4.899-1.277m2.121-1.636A10.45 10.45 0 0022.066 12c-1.292-3.271-5.116-7.5-10.066-7.5-1.07 0-2.104.154-3.09.44"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                // Eye SVG (terbuka)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-full bg-green-500 text-white text-lg font-medium hover:bg-green-600 focus:ring focus:ring-green-500 focus:outline-none transition-colors duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Yes I have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
