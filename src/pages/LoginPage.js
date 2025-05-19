import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before attempting login

    try {
      const response = await login(formData);
      if (response.token) {
        authLogin({
          username: formData.email,
          token: response.token,
          role: response.user.role,
        });
        navigate(response.user.role === "admin" ? "/admin" : "/");
      } else {
        setError("Email atau password salah");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email atau password salah",
        });
      }
    } catch (err) {
      setError(err.message || "Email atau password salah");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email atau password salah",
      });
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
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring focus:ring-green-500 focus:border-green-500 focus:outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password:
              </label>
              <div className="flex items-center relative">
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
                  className="ml-2 absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-sm leading-5 focus:outline-none bg-transparent"
                  tabIndex={-1}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Lihat password"
                  }
                >
                  {showPassword ? (
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
                  ) : (
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
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
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
