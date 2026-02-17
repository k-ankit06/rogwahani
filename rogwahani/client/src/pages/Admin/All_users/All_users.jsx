import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    BsThreeDotsVertical,
    BsSearch,
    BsFilter,
    BsArrowUpShort,
    BsArrowDownShort,
    BsPlusCircle,
} from "react-icons/bs";
import {
    FiUser,
    FiMail,
    FiShield,
    FiCheckCircle,
    FiXCircle,
    FiEdit,
    FiTrash2,
    FiRefreshCw,
    FiAlertTriangle,
    FiTruck,
    FiUserPlus,
} from "react-icons/fi";
import { BiSolidUserDetail, BiUserCheck } from "react-icons/bi";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(6);

    // Filter state
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    // Backend URL
    const BACKEND_URL = "http://localhost:5000";

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BACKEND_URL}/api/users/`);

            // Ensure users have an isDisabled property (in case it's undefined in some users)
            const processedUsers = response.data.map((user) => ({
                ...user,
                isDisabled:
                    user.isDisabled === undefined ? false : user.isDisabled,
            }));

            setUsers(processedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Failed to fetch users. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Sorting function
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    // Filter users based on search query and role/status filters
    const filteredUsers = users.filter((user) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            user.name?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.role?.toLowerCase().includes(query);

        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && !user.isDisabled) ||
            (statusFilter === "disabled" && user.isDisabled);

        return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort users
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!a[sortBy] || !b[sortBy]) return 0;

        if (sortOrder === "asc") {
            return a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;
        } else {
            return a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? 1 : -1;
        }
    });

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

    // User actions
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsActionMenuOpen(null);
        // Implement edit modal or navigation
        console.log("Edit user:", user);
    };

    const handleDeleteUser = async (userId) => {
        setIsActionMenuOpen(null);

        try {
            await axios.delete(`${BACKEND_URL}/api/users/${userId}`);

            // Update local state after successful deletion
            setUsers(users.filter((user) => user._id !== userId));
            setShowConfirmation(null);

            // Show success message (you can implement a toast notification here)
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Failed to delete user. Please try again.");
        }
    };

    const handleToggleStatus = async (userId, currentStatus) => {
        setIsActionMenuOpen(null);

        try {
            const response = await axios.patch(
                `${BACKEND_URL}/api/users/${userId}/toggle-status`
            );

            // Update local state after successful status toggle
            setUsers(
                users.map((user) =>
                    user._id === userId
                        ? { ...user, isDisabled: !user.isDisabled }
                        : user
                )
            );

            // Show success message (you can implement a toast notification here)
        } catch (error) {
            console.error("Error toggling user status:", error);
            setError("Failed to update user status. Please try again.");
        }
    };

    const handleChangeRole = async (userId, newRole) => {
        setIsActionMenuOpen(null);

        try {
            const response = await axios.patch(
                `${BACKEND_URL}/api/users/${userId}/role`,
                { role: newRole }
            );

            // Update local state after successful role change
            setUsers(
                users.map((user) =>
                    user._id === userId ? { ...user, role: newRole } : user
                )
            );

            // Show success message (you can implement a toast notification here)
        } catch (error) {
            console.error("Error changing user role:", error);
            setError("Failed to update user role. Please try again.");
        }
    };

    // Get role icon
    const getRoleIcon = (role) => {
        switch (role) {
            case "admin":
                return <FiShield className="mr-1 text-red-400" />;
            case "user":
                return <BiUserCheck className="mr-1 text-blue-400" />;
            case "driver":
                return <FiTruck className="mr-1 text-yellow-400" />;
            default:
                return <FiUser className="mr-1 text-green-400" />;
        }
    };

    // Get role background color
    const getRoleStyles = (role) => {
        switch (role) {
            case "admin":
                return "bg-red-500/20 text-red-400 border border-red-500/30";
            case "user":
                return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
            case "driver":
                return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
            default:
                return "bg-green-500/20 text-green-400 border border-green-500/30";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at center center, rgb(107, 33, 168), rgb(107, 33, 168) 3px, transparent 3px, transparent 100%)",
                    backgroundSize: "20px 20px",
                }}
            />

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-red-400 font-medium">
                                    Admin Dashboard
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold">
                                User{" "}
                                <span className="text-red-400">Management</span>
                            </h1>
                            <p className="text-gray-300 mt-2">
                                Manage your platform users, set permissions, and
                                monitor activity
                            </p>
                        </div>

                        <motion.button
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-red-900/30 self-start md:self-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => console.log("Add new user")}
                        >
                            <FiUserPlus />
                            <span>Add New User</span>
                        </motion.button>
                    </div>

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        <motion.div
                            className="bg-gray-800/70 backdrop-blur-md rounded-xl p-5 border border-red-500/10 shadow-lg shadow-red-900/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                                    <FiUser className="text-red-400 text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {users.length}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Total Users
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-800/70 backdrop-blur-md rounded-xl p-5 border border-green-500/10 shadow-lg shadow-green-900/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                                    <FiCheckCircle className="text-green-400 text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {
                                            users.filter((u) => !u.isDisabled)
                                                .length
                                        }
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Active Users
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-800/70 backdrop-blur-md rounded-xl p-5 border border-red-500/10 shadow-lg shadow-red-900/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                                    <FiXCircle className="text-red-400 text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {
                                            users.filter((u) => u.isDisabled)
                                                .length
                                        }
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Disabled Users
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-800/70 backdrop-blur-md rounded-xl p-5 border border-blue-500/10 shadow-lg shadow-blue-900/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                                    <FiShield className="text-blue-400 text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {
                                            users.filter(
                                                (u) => u.role === "admin"
                                            ).length
                                        }
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Admin Users
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    className="mb-6 flex flex-col space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="relative w-full sm:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <BsSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="bg-gray-800/70 w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                                placeholder="Search by name, email or role..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-4 w-full sm:w-auto">
                            <motion.button
                                className="flex items-center space-x-2 bg-gray-800/70 px-4 py-3 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all"
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <BsFilter className="text-red-400" />
                                <span>
                                    {showFilters
                                        ? "Hide Filters"
                                        : "Show Filters"}
                                </span>
                            </motion.button>

                            <motion.button
                                className="flex items-center space-x-2 bg-gray-800/70 px-4 py-3 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all"
                                whileHover={{ scale: 1.05 }}
                                onClick={fetchUsers}
                            >
                                <FiRefreshCw
                                    className={`text-red-400 ${loading ? "animate-spin" : ""}`}
                                />
                                <span>Refresh</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-gray-800/70 backdrop-blur-md rounded-xl border border-red-500/10 p-4 flex flex-wrap gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300">
                                            Filter by Role
                                        </label>
                                        <div className="flex space-x-2">
                                            {[
                                                "all",
                                                "admin",
                                                "user",
                                                "driver",
                                            ].map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() =>
                                                        setRoleFilter(role)
                                                    }
                                                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                                                        roleFilter === role
                                                            ? "bg-red-600 text-white"
                                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                    }`}
                                                >
                                                    {role
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        role.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300">
                                            Filter by Status
                                        </label>
                                        <div className="flex space-x-2">
                                            {["all", "active", "disabled"].map(
                                                (status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() =>
                                                            setStatusFilter(
                                                                status
                                                            )
                                                        }
                                                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                                                            statusFilter ===
                                                            status
                                                                ? "bg-red-600 text-white"
                                                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                                        }`}
                                                    >
                                                        {status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            status.slice(1)}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        className="mb-6 bg-red-900/40 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center space-x-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiAlertTriangle className="text-red-400 text-xl flex-shrink-0" />
                        <div>
                            <p>{error}</p>
                            <button
                                className="text-red-400 hover:text-red-300 text-sm mt-1"
                                onClick={() => setError(null)}
                            >
                                Dismiss
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Users Table */}
                <motion.div
                    className="bg-gray-800/70 backdrop-blur-md rounded-xl border border-red-500/10 overflow-hidden shadow-xl shadow-red-900/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {loading ? (
                        <div className="p-20 flex flex-col justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-500 border-t-transparent mb-4"></div>
                            <p className="text-gray-400">Loading users...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-800/90">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSort("name")}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>Name</span>
                                                {sortBy === "name" &&
                                                    (sortOrder === "asc" ? (
                                                        <BsArrowUpShort className="text-red-400" />
                                                    ) : (
                                                        <BsArrowDownShort className="text-red-400" />
                                                    ))}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSort("email")}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>Email</span>
                                                {sortBy === "email" &&
                                                    (sortOrder === "asc" ? (
                                                        <BsArrowUpShort className="text-red-400" />
                                                    ) : (
                                                        <BsArrowDownShort className="text-red-400" />
                                                    ))}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSort("role")}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>Role</span>
                                                {sortBy === "role" &&
                                                    (sortOrder === "asc" ? (
                                                        <BsArrowUpShort className="text-red-400" />
                                                    ) : (
                                                        <BsArrowDownShort className="text-red-400" />
                                                    ))}
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {currentUsers.length > 0 ? (
                                        currentUsers.map((user) => (
                                            <motion.tr
                                                key={user._id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="hover:bg-gray-700/30 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-red-900/50 rounded-full flex items-center justify-center border border-red-500/30">
                                                            {user.role ===
                                                            "admin" ? (
                                                                <FiShield className="text-red-400" />
                                                            ) : user.role ===
                                                              "driver" ? (
                                                                <FiTruck className="text-yellow-400" />
                                                            ) : (
                                                                <FiUser className="text-blue-400" />
                                                            )}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-white">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-400">
                                                                ID:{" "}
                                                                {user._id.substring(
                                                                    0,
                                                                    8
                                                                )}
                                                                ...
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <FiMail className="text-gray-400 mr-2" />
                                                        <div className="text-sm text-gray-300">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                    {user.email_verified && (
                                                        <span className="inline-flex items-center mt-1 text-xs text-green-400">
                                                            <FiCheckCircle className="mr-1" />{" "}
                                                            Verified
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleStyles(user.role)}`}
                                                    >
                                                        {getRoleIcon(user.role)}
                                                        {user.role
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            user.role.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                            user.isDisabled
                                                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                                                : "bg-green-500/20 text-green-400 border border-green-500/30"
                                                        }`}
                                                    >
                                                        {user.isDisabled ? (
                                                            <>
                                                                <FiXCircle className="mr-1" />
                                                                Disabled
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FiCheckCircle className="mr-1" />
                                                                Active
                                                            </>
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                                    <motion.button
                                                        className="text-gray-300 hover:text-white p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70"
                                                        whileHover={{
                                                            scale: 1.1,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                        onClick={() =>
                                                            setIsActionMenuOpen(
                                                                isActionMenuOpen ===
                                                                    user._id
                                                                    ? null
                                                                    : user._id
                                                            )
                                                        }
                                                    >
                                                        <BsThreeDotsVertical />
                                                    </motion.button>

                                                    {isActionMenuOpen ===
                                                        user._id && (
                                                        <div className="absolute right-0 z-10 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg py-1 border border-red-500/20">
                                                            {[
                                                                "admin",
                                                                "user",
                                                                "driver",
                                                            ].map(
                                                                (role) =>
                                                                    user.role !==
                                                                        role && (
                                                                        <button
                                                                            key={
                                                                                role
                                                                            }
                                                                            className="px-4 py-2 text-sm text-left w-full hover:bg-gray-700 flex items-center"
                                                                            onClick={() =>
                                                                                handleChangeRole(
                                                                                    user._id,
                                                                                    role
                                                                                )
                                                                            }
                                                                        >
                                                                            {getRoleIcon(
                                                                                role
                                                                            )}
                                                                            <span>
                                                                                Set
                                                                                as{" "}
                                                                                {role
                                                                                    .charAt(
                                                                                        0
                                                                                    )
                                                                                    .toUpperCase() +
                                                                                    role.slice(
                                                                                        1
                                                                                    )}
                                                                            </span>
                                                                        </button>
                                                                    )
                                                            )}

                                                            <button
                                                                className="px-4 py-2 text-sm text-left w-full hover:bg-gray-700 flex items-center"
                                                                onClick={() =>
                                                                    handleEditUser(
                                                                        user
                                                                    )
                                                                }
                                                            >
                                                                <FiEdit className="mr-2 text-blue-400" />{" "}
                                                                Edit User
                                                            </button>

                                                            <button
                                                                className={`px-4 py-2 text-sm text-left w-full hover:bg-gray-700 flex items-center ${
                                                                    user.isDisabled
                                                                        ? "text-green-400"
                                                                        : "text-red-400"
                                                                }`}
                                                                onClick={() =>
                                                                    handleToggleStatus(
                                                                        user._id,
                                                                        user.isDisabled
                                                                    )
                                                                }
                                                            >
                                                                {user.isDisabled ? (
                                                                    <>
                                                                        <FiCheckCircle className="mr-2" />{" "}
                                                                        Enable
                                                                        User
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FiXCircle className="mr-2" />{" "}
                                                                        Disable
                                                                        User
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                className="px-4 py-2 text-sm text-left w-full hover:bg-gray-700 text-red-400 flex items-center"
                                                                onClick={() =>
                                                                    setShowConfirmation(
                                                                        user._id
                                                                    )
                                                                }
                                                            >
                                                                <FiTrash2 className="mr-2" />{" "}
                                                                Delete User
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Delete Confirmation Dialog */}
                                                    {showConfirmation ===
                                                        user._id && (
                                                        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                                                            <motion.div
                                                                className="bg-gray-800 rounded-xl p-6 max-w-md mx-auto border border-red-500/20"
                                                                initial={{
                                                                    scale: 0.9,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    scale: 1,
                                                                    opacity: 1,
                                                                }}
                                                                exit={{
                                                                    scale: 0.9,
                                                                    opacity: 0,
                                                                }}
                                                            >
                                                                <div className="flex items-center space-x-3 text-red-400 mb-4">
                                                                    <FiAlertTriangle className="text-2xl" />
                                                                    <h3 className="text-xl font-semibold">
                                                                        Confirm
                                                                        Deletion
                                                                    </h3>
                                                                </div>
                                                                <p className="text-gray-300 mb-6">
                                                                    Are you sure
                                                                    you want to
                                                                    delete user{" "}
                                                                    <span className="font-semibold">
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </span>
                                                                    ?
                                                                </p>
                                                                <div className="flex justify-end space-x-3">
                                                                    <button
                                                                        className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
                                                                        onClick={() =>
                                                                            setShowConfirmation(
                                                                                null
                                                                            )
                                                                        }
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                                                        onClick={() =>
                                                                            handleDeleteUser(
                                                                                user._id
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                        User
                                                                    </button>
                                                                </div>
                                                            </motion.div>
                                                        </div>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-12 text-center text-gray-400"
                                            >
                                                {sortedUsers.length === 0 ? (
                                                    <div className="flex flex-col items-center">
                                                        <FiAlertTriangle className="text-3xl mb-2 text-red-400" />
                                                        <p>
                                                            No users match your
                                                            search criteria.
                                                        </p>
                                                        <button
                                                            className="mt-2 text-red-400 hover:text-red-300"
                                                            onClick={() => {
                                                                setSearchQuery(
                                                                    ""
                                                                );
                                                                setRoleFilter(
                                                                    "all"
                                                                );
                                                                setStatusFilter(
                                                                    "all"
                                                                );
                                                            }}
                                                        >
                                                            Clear all filters
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p>
                                                        No users found. Try
                                                        adding some users first.
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && sortedUsers.length > 0 && (
                        <div className="px-6 py-4 bg-gray-800/60 border-t border-gray-700 flex items-center justify-between">
                            <div className="text-sm text-gray-400">
                                Showing {indexOfFirstUser + 1} to{" "}
                                {indexOfLastUser > sortedUsers.length
                                    ? sortedUsers.length
                                    : indexOfLastUser}{" "}
                                of {sortedUsers.length} users
                            </div>
                            <div className="flex space-x-2">
                                <motion.button
                                    className={`px-3 py-1 rounded-lg text-sm ${
                                        currentPage === 1
                                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                            : "bg-gray-700 text-white hover:bg-red-600"
                                    }`}
                                    whileHover={
                                        currentPage !== 1 ? { scale: 1.05 } : {}
                                    }
                                    onClick={() =>
                                        currentPage > 1 &&
                                        setCurrentPage(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </motion.button>

                                {Array.from({
                                    length: Math.min(totalPages, 5),
                                }).map((_, index) => {
                                    // Calculate page number for pagination display
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = index + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = index + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + index;
                                    } else {
                                        pageNum = currentPage - 2 + index;
                                    }

                                    return (
                                        <motion.button
                                            key={pageNum}
                                            className={`px-3 py-1 rounded-lg text-sm ${
                                                currentPage === pageNum
                                                    ? "bg-red-600 text-white"
                                                    : "bg-gray-700 text-white hover:bg-gray-600"
                                            }`}
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() =>
                                                setCurrentPage(pageNum)
                                            }
                                        >
                                            {pageNum}
                                        </motion.button>
                                    );
                                })}

                                <motion.button
                                    className={`px-3 py-1 rounded-lg text-sm ${
                                        currentPage === totalPages
                                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                            : "bg-gray-700 text-white hover:bg-red-600"
                                    }`}
                                    whileHover={
                                        currentPage !== totalPages
                                            ? { scale: 1.05 }
                                            : {}
                                    }
                                    onClick={() =>
                                        currentPage < totalPages &&
                                        setCurrentPage(currentPage + 1)
                                    }
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </motion.button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AllUsers;
