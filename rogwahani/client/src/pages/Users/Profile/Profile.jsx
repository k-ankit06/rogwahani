import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    RiUser3Line,
    RiMailLine,
    RiLockPasswordLine,
    RiCheckDoubleLine,
    RiImageLine,
    RiUserStarLine,
    RiGoogleFill,
    RiFacebookFill,
    RiShieldUserLine,
    RiCarLine,
    RiEditLine,
    RiLogoutBoxRLine,
    RiHistoryLine,
    RiSettings3Line,
    RiHeartPulseLine,
    RiAlertLine,
    RiSaveLine,
    RiEyeLine,
    RiEyeOffLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Demo form state - in a real app, you'd use the user data to populate initial values
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "••••••••",
        picture:
            user?.picture ||
            user?.social_login?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    });

    // Profile sections animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would implement the API call to update the profile
        console.log("Profile update data:", formData);
        setEditMode(false);
    };

    // Get user avatar image
    const getUserAvatar = () => {
        return (
            user?.picture ||
            user?.social_login?.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        );
    };

    // Get user role badge color
    const getRoleBadgeColor = () => {
        switch (user?.role) {
            case "admin":
                return "bg-purple-600 text-purple-100";
            case "driver":
                return "bg-green-600 text-green-100";
            default:
                return "bg-blue-600 text-blue-100";
        }
    };

    return (
        <div className="container mx-auto pt-12 px-4">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Your Profile
                </h1>
                <p className="text-gray-400">
                    Manage your personal information and preferences
                </p>
            </motion.div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Card & Quick Actions */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Profile Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-red-700 to-red-900 h-32 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    delay: 0.2,
                                }}
                                className="relative"
                            >
                                <img
                                    src={getUserAvatar()}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border-4 border-gray-800 object-cover"
                                />
                                {!user?.isDisabled && (
                                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
                                )}
                            </motion.div>
                        </div>

                        <div className="p-6 text-center">
                            <h2 className="text-xl font-bold text-white mb-1">
                                {user?.name}
                            </h2>
                            <div className="flex justify-center mb-3">
                                <span
                                    className={`text-xs px-3 py-1 rounded-full ${getRoleBadgeColor()}`}
                                >
                                    {user?.role?.charAt(0).toUpperCase() +
                                        user?.role?.slice(1)}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">
                                {user?.email}
                            </p>

                            {user?.social_login?.providerId && (
                                <div className="flex justify-center space-x-2 mb-4">
                                    <span className="text-gray-400 text-sm">
                                        Connected with:
                                    </span>
                                    {user?.social_login?.providerId ===
                                    "google.com" ? (
                                        <RiGoogleFill className="text-red-500" />
                                    ) : user?.social_login?.providerId ===
                                      "facebook.com" ? (
                                        <RiFacebookFill className="text-blue-500" />
                                    ) : (
                                        <RiShieldUserLine className="text-green-500" />
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col justify-center space-y-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleEditMode}
                                    className="bg-red-600 hover:bg-red-700 font-semibold text-md justify-center text-white px-4 py-3 rounded-lg flex items-center"
                                >
                                    <RiEditLine className="mr-2" /> Edit Profile
                                </motion.button>

                                {user?.role !== "driver" && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-blue-600 hover:bg-blue-700 font-semibold text-md justify-center text-white px-4 py-3 rounded-lg flex items-center"
                                    >
                                        <RiCarLine className="mr-2" /> Apply as
                                        Driver
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Account Status
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-blue-500/20 p-2 rounded-full">
                                        <RiMailLine className="text-blue-400" />
                                    </div>
                                    <span className="ml-3 text-gray-300">
                                        Email Verification
                                    </span>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${user?.email_verified ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                                >
                                    {user?.email_verified
                                        ? "Verified"
                                        : "Pending"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-purple-500/20 p-2 rounded-full">
                                        <RiUserStarLine className="text-purple-400" />
                                    </div>
                                    <span className="ml-3 text-gray-300">
                                        Account Type
                                    </span>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor()}`}
                                >
                                    {user?.role?.charAt(0).toUpperCase() +
                                        user?.role?.slice(1)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-red-500/20 p-2 rounded-full">
                                        <RiShieldUserLine className="text-red-400" />
                                    </div>
                                    <span className="ml-3 text-gray-300">
                                        Account Status
                                    </span>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${!user?.isDisabled ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                                >
                                    {!user?.isDisabled ? "Active" : "Disabled"}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column - Edit Profile Form */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-2 space-y-6"
                >
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-white">
                                Personal Information
                            </h2>
                            {!editMode ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleEditMode}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center text-sm"
                                >
                                    <RiEditLine className="mr-2" /> Edit
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleEditMode}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg flex items-center text-sm"
                                >
                                    Cancel
                                </motion.button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* Profile Picture */}
                                <div className="flex items-center">
                                    <div className="w-24 h-24 relative">
                                        <img
                                            src={formData.picture}
                                            alt="Profile"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                        {editMode && (
                                            <motion.div
                                                whileHover={{ opacity: 1 }}
                                                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 cursor-pointer"
                                            >
                                                <RiImageLine className="text-white text-xl" />
                                            </motion.div>
                                        )}
                                    </div>
                                    {editMode && (
                                        <div className="ml-6">
                                            <h3 className="text-white font-medium mb-2">
                                                Profile Picture
                                            </h3>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                type="button"
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg flex items-center text-sm"
                                            >
                                                <RiImageLine className="mr-2" />{" "}
                                                Change Image
                                            </motion.button>
                                        </div>
                                    )}
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-gray-400 mb-2 text-sm"
                                        >
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <RiUser3Line className="text-gray-500" />
                                            </div>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                disabled={!editMode}
                                                className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 ${!editMode ? "opacity-70" : ""}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-gray-400 mb-2 text-sm"
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <RiMailLine className="text-gray-500" />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                disabled={!editMode}
                                                className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 ${!editMode ? "opacity-70" : ""}`}
                                            />
                                            {user?.email_verified && (
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <RiCheckDoubleLine className="text-green-500" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-gray-400 mb-2 text-sm"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <RiLockPasswordLine className="text-gray-500" />
                                            </div>
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                disabled={!editMode}
                                                className={`w-full bg-gray-700 text-white rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 ${!editMode ? "opacity-70" : ""}`}
                                            />
                                            {editMode && (
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <RiEyeOffLine className="text-gray-400" />
                                                    ) : (
                                                        <RiEyeLine className="text-gray-400" />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Role Field - Read Only */}
                                    <div>
                                        <label
                                            htmlFor="role"
                                            className="block text-gray-400 mb-2 text-sm"
                                        >
                                            Account Type
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <RiUserStarLine className="text-gray-500" />
                                            </div>
                                            <input
                                                type="text"
                                                id="role"
                                                value={
                                                    user?.role
                                                        ?.charAt(0)
                                                        .toUpperCase() +
                                                    user?.role?.slice(1)
                                                }
                                                disabled
                                                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-3 opacity-70"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Driver Application Banner - show only if user is not a driver */}
                                {user?.role !== "driver" && (
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg p-4 shadow-lg mt-6 flex justify-between items-center"
                                    >
                                        <div>
                                            <h3 className="text-white font-medium">
                                                Become an Ambulance Driver
                                            </h3>
                                            <p className="text-blue-200 text-sm">
                                                Help us save lives by joining
                                                our driver network
                                            </p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            className="bg-white text-blue-700 px-4 py-2 rounded-lg flex items-center font-medium"
                                        >
                                            <RiCarLine className="mr-2" /> Apply
                                            Now
                                        </motion.button>
                                    </motion.div>
                                )}

                                {/* Submit Buttons - show only in edit mode */}
                                {editMode && (
                                    <div className="flex justify-end space-x-4 mt-6">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            onClick={toggleEditMode}
                                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                                        >
                                            <RiSaveLine className="mr-2" /> Save
                                            Changes
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
