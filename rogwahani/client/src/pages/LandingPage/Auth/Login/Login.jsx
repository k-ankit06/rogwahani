import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    BsEnvelope,
    BsLock,
    BsPerson,
    BsGoogle,
    BsGithub,
    BsFacebook,
    BsArrowRight,
    BsEye,
    BsEyeSlash,
} from "react-icons/bs";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "./../../../../store/slices/authSlice";
import SocialLogin from "./SocialLogin";

const AuthLogin = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (token && user) {
            navigate("/");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = { email: "", password: "" };

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
            valid = false;
        }

        if (!formData.password || formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            valid = false;
        }

        setErrors(newErrors);

        // Show validation errors as toasts
        if (!valid) {
            Object.values(newErrors).forEach((error) => {
                if (error) {
                    toast.error(error);
                }
            });
        }

        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Show loading toast
            const toastId = toast.loading("Signing in...");

            try {
                const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.post(
                    `${BACKEND_URL}/api/auth/login`,
                    formData
                );
                // localStorage.setItem("token", response.data.token);
                console.log(response.data);
                dispatch(
                    setUser({
                        user: response.data.user,
                        token: response.data.token,
                    })
                );

                // Update loading toast to success
                toast.update(toastId, {
                    render: "Login successful! Welcome back!",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });

                // Reset form after successful login
                setFormData({
                    email: "",
                    password: "",
                });

                // Navigate after a short delay to allow the success message to be seen
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } catch (error) {
                // Update loading toast to error
                toast.update(toastId, {
                    render:
                        error.response?.data?.message ||
                        "Login failed. Please try again.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        }
    };
    return (
        <div className="min-h-screen py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            {/* Background Pattern */}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at center center, rgb(107, 33, 168), rgb(107, 33, 168) 3px, transparent 3px, transparent 100%)",
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Animated Background Shapes */}
            <motion.div
                className="absolute top-20 right-20 w-72 h-72 bg-red-600/50 rounded-full filter blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.2, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                }}
            />
            <motion.div
                className="absolute bottom-20 left-20 w-72 h-72 bg-red-600/50 rounded-full filter blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                }}
            />

            {/* Auth Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md"
            >
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome to{" "}
                        <span className="text-red-400">RogWahani</span>
                    </h1>
                    <p className="text-gray-400">
                        Sign in to access ambulance services and get help
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-700">
                    {/* Auth Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label
                                className="text-gray-300 text-sm font-medium"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <BsEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                className="text-gray-300 text-sm font-medium"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <BsLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </button>
                            </div>
                        </div>

                        {/* <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-red-400 hover:text-red-300">
                  Forgot password?
                </a>
              </div> */}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 group"
                        >
                            <span>Sign In</span>
                            <BsArrowRight className="transition-transform group-hover:translate-x-1" />
                        </motion.button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-800/50 text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    {/* Social Login Buttons */}
                    <SocialLogin />

                    {/* Switch Form */}
                    <p className="mt-6 text-center text-gray-400">
                        Don't have an account?
                        <Link
                            to="/signup"
                            className="text-red-400 hover:text-red-300 font-medium"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLogin;
