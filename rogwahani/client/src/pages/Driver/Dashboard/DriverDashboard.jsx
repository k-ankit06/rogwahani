import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    RiAlertLine,
    RiMapPinLine,
    RiTimeLine,
    RiEyeLine,
    RiArrowRightLine,
    RiPhoneLine,
    RiUserHeartLine,
    RiHospitalLine,
    RiCarLine,
    RiCalendarCheckLine,
    RiLineChartLine,
    RiPieChartLine,
    RiGasStationLine,
    RiCheckboxCircleLine,
    RiCloseCircleLine,
    RiCarWashingLine,
    RiRoadMapLine,
    RiWalletLine,
    RiStarLine,
    RiMoneyDollarCircleLine,
    RiUserLocationLine,
    RiSearchLine,
    RiHeartPulseLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";

const DriverDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [dutyStatus, setDutyStatus] = useState("on-duty");

    // Sample data for dashboard
    const quickActions = [
        {
            id: 1,
            name: "Accept Ride",
            icon: <RiCheckboxCircleLine />,
            color: "bg-green-600",
            path: "/driver/ride-requests",
        },
        {
            id: 2,
            name: "Start Navigation",
            icon: <RiRoadMapLine />,
            color: "bg-blue-500",
            path: "/driver/navigation",
        },
        {
            id: 3,
            name: "Update Status",
            icon: <RiTimeLine />,
            color: "bg-yellow-500",
            path: "/driver/status",
        },
        {
            id: 4,
            name: "Report Issue",
            icon: <RiAlertLine />,
            color: "bg-red-500",
            path: "/driver/report",
        },
    ];

    const upcomingRides = [
        {
            id: 1,
            patientName: "Rahul Sharma",
            type: "Emergency",
            pickup: "42 Park Street, Kolkata",
            destination: "Apollo Hospital, Salt Lake",
            time: "Today, 2:30 PM",
            distance: "8.2 km",
            status: "Assigned",
        },
        {
            id: 2,
            patientName: "Priya Patel",
            type: "Non-Emergency",
            pickup: "Sector 5, Salt Lake",
            destination: "AMRI Hospital, Dhakuria",
            time: "Today, 4:15 PM",
            distance: "12.4 km",
            status: "Scheduled",
        },
    ];

    const recentRides = [
        {
            id: 1,
            date: "Yesterday",
            patientName: "Amit Kumar",
            pickup: "Ballygunge",
            destination: "Ruby Hospital",
            earnings: "₹380",
            status: "Completed",
            rating: 5,
        },
        {
            id: 2,
            date: "Feb 24, 2025",
            patientName: "Neha Singh",
            pickup: "Howrah",
            destination: "SSKM Hospital",
            earnings: "₹520",
            status: "Completed",
            rating: 4,
        },
        {
            id: 3,
            date: "Feb 22, 2025",
            patientName: "Rajesh Roy",
            pickup: "New Town",
            destination: "Fortis Hospital",
            earnings: "₹450",
            status: "Completed",
            rating: 5,
        },
    ];

    const statistics = [
        {
            id: 1,
            title: "Today's Rides",
            value: 5,
            icon: <RiCarLine />,
            change: "+2",
            color: "bg-blue-500",
        },
        {
            id: 2,
            title: "Avg. Response",
            value: "3.5 min",
            icon: <RiTimeLine />,
            change: "-0.5 min",
            color: "bg-green-500",
        },
        {
            id: 3,
            title: "Today's Earnings",
            value: "₹1,850",
            icon: <RiWalletLine />,
            change: "+₹320",
            color: "bg-yellow-500",
        },
        {
            id: 4,
            title: "Rating",
            value: "4.8",
            icon: <RiStarLine />,
            change: "+0.2",
            color: "bg-purple-500",
        },
    ];

    const vehicleStatus = {
        fuelLevel: 78,
        nextMaintenance: "Mar 15, 2025",
        ambulanceType: "Basic Life Support",
        lastSanitized: "Today, 7:30 AM",
        equipmentStatus: "All Available",
        oxygenLevel: "85%",
    };

    // Animation variants
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

    const toggleDutyStatus = () => {
        setDutyStatus(dutyStatus === "on-duty" ? "off-duty" : "on-duty");
    };

    return (
        <div className="container mx-auto pt-12">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex justify-between items-center"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Welcome back, {user?.name || "Driver"}
                    </h1>
                    <p className="text-gray-400">
                        Your ambulance is ready to serve those in need.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleDutyStatus}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                        dutyStatus === "on-duty"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                >
                    <span
                        className={`h-3 w-3 ${dutyStatus === "on-duty" ? "bg-green-500" : "bg-red-500"} rounded-full mr-2 animate-pulse`}
                    ></span>
                    {dutyStatus === "on-duty" ? "On Duty" : "Off Duty"}
                </motion.button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
                {quickActions.map((action) => (
                    <motion.div
                        key={action.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`${action.color} rounded-lg p-4 text-white shadow-lg cursor-pointer flex flex-col items-center justify-center`}
                    >
                        <div className="text-3xl mb-2">{action.icon}</div>
                        <h3 className="font-medium text-center">
                            {action.name}
                        </h3>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Ride Requests & Statistics */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-2 space-y-6"
                >
                    {/* Upcoming Rides */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-white">
                                Upcoming Rides
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-red-500 flex items-center text-sm"
                            >
                                View All <RiArrowRightLine className="ml-1" />
                            </motion.button>
                        </div>

                        <div className="space-y-4">
                            {upcomingRides.length > 0 ? (
                                upcomingRides.map((ride) => (
                                    <motion.div
                                        key={ride.id}
                                        whileHover={{ x: 5 }}
                                        className="bg-gray-700 rounded-lg p-4"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center">
                                                <div
                                                    className={`p-3 rounded-full ${ride.type === "Emergency" ? "bg-red-500/20 text-red-500" : "bg-blue-500/20 text-blue-500"}`}
                                                >
                                                    {ride.type ===
                                                    "Emergency" ? (
                                                        <RiAlertLine
                                                            size={20}
                                                        />
                                                    ) : (
                                                        <RiUserHeartLine
                                                            size={20}
                                                        />
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-medium text-white">
                                                        {ride.type} Ride
                                                    </h3>
                                                    <p className="text-sm text-gray-400">
                                                        Patient:{" "}
                                                        {ride.patientName}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${ride.status === "Assigned" ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-500/20 text-blue-400"}`}
                                            >
                                                {ride.status}
                                            </span>
                                        </div>

                                        <div className="pl-12 space-y-2 mb-3">
                                            <div className="flex items-start">
                                                <RiMapPinLine className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Pickup
                                                    </p>
                                                    <p className="text-sm text-white">
                                                        {ride.pickup}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <RiHospitalLine className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Destination
                                                    </p>
                                                    <p className="text-sm text-white">
                                                        {ride.destination}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-600 pt-3 flex justify-between items-center">
                                            <div className="flex items-center">
                                                <RiTimeLine className="text-gray-400 mr-1" />
                                                <span className="text-sm text-gray-300">
                                                    {ride.time}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <RiRoadMapLine className="text-gray-400 mr-1" />
                                                <span className="text-sm text-gray-300">
                                                    {ride.distance}
                                                </span>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                                            >
                                                Navigate
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-4">
                                    No upcoming rides
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {/* Statistics */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {statistics.map((stat) => (
                            <motion.div
                                key={stat.id}
                                whileHover={{ y: -5 }}
                                className="bg-gray-800 rounded-lg p-4 shadow-lg"
                            >
                                <div
                                    className={`${stat.color} bg-opacity-20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2`}
                                >
                                    <span
                                        className={`text-${stat.color.split("-")[1]}-400`}
                                    >
                                        {stat.icon}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    {stat.value}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {stat.title}
                                </p>
                                <p
                                    className={`text-xs ${stat.change.includes("+") ? "text-green-400" : "text-red-400"} mt-1`}
                                >
                                    {stat.change} from yesterday
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Recent Rides */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-white">
                                Recent Rides
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-red-500 flex items-center text-sm"
                            >
                                View All <RiArrowRightLine className="ml-1" />
                            </motion.button>
                        </div>

                        <div className="space-y-3">
                            {recentRides.map((ride) => (
                                <motion.div
                                    key={ride.id}
                                    whileHover={{
                                        backgroundColor:
                                            "rgba(255,255,255,0.05)",
                                    }}
                                    className="p-3 rounded-lg flex justify-between items-center border-b border-gray-700"
                                >
                                    <div className="flex items-center">
                                        <div className="bg-green-500/20 p-2 rounded-full">
                                            <RiCheckboxCircleLine className="text-green-400" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium text-white">
                                                {ride.patientName}
                                            </h3>
                                            <p className="text-xs text-gray-400">
                                                {ride.pickup} →{" "}
                                                {ride.destination}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {ride.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-400 font-medium">
                                            {ride.earnings}
                                        </p>
                                        <div className="flex items-center justify-end mt-1">
                                            {[...Array(5)].map((_, index) => (
                                                <RiStarLine
                                                    key={index}
                                                    className={`text-xs ${index < ride.rating ? "text-yellow-400" : "text-gray-600"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column - Vehicle Status & Profile */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Driver Performance */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Your Performance
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-400">
                                        Response Time
                                    </span>
                                    <span className="text-sm text-green-400">
                                        Excellent
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: "88%" }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-400">
                                        Patient Feedback
                                    </span>
                                    <span className="text-sm text-green-400">
                                        4.8/5
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: "96%" }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-400">
                                        Hospital Coordination
                                    </span>
                                    <span className="text-sm text-yellow-400">
                                        Good
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-yellow-500 h-2 rounded-full"
                                        style={{ width: "75%" }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-400">
                                        On-time Arrival
                                    </span>
                                    <span className="text-sm text-green-400">
                                        Excellent
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: "92%" }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-700">
                            <h3 className="text-white font-medium mb-2">
                                Weekly Statistics
                            </h3>
                            <div className="flex justify-between mb-2">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-white">
                                        32
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Total Rides
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold text-white">
                                        ₹9,450
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Earnings
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-bold text-white">
                                        286 km
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Distance
                                    </p>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-4 bg-gray-700 hover:bg-gray-600 w-full py-2 rounded-lg text-gray-300 text-sm flex items-center justify-center"
                        >
                            <RiLineChartLine className="mr-1" /> View Detailed
                            Analytics
                        </motion.button>
                    </motion.div>

                    {/* Vehicle Status */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Vehicle Status
                        </h2>

                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-400">
                                    Fuel Level
                                </span>
                                <span className="text-sm text-white">
                                    {vehicleStatus.fuelLevel}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${
                                        vehicleStatus.fuelLevel > 70
                                            ? "bg-green-500"
                                            : vehicleStatus.fuelLevel > 30
                                              ? "bg-yellow-500"
                                              : "bg-red-500"
                                    }`}
                                    style={{
                                        width: `${vehicleStatus.fuelLevel}%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-400">
                                    Oxygen Level
                                </span>
                                <span className="text-sm text-white">
                                    {vehicleStatus.oxygenLevel}
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: "85%" }}
                                ></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center">
                                    <RiCarWashingLine className="text-gray-400 mr-2" />
                                    <span className="text-gray-300">
                                        Last Sanitized
                                    </span>
                                </div>
                                <span className="text-white">
                                    {vehicleStatus.lastSanitized}
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center">
                                    <RiCalendarCheckLine className="text-gray-400 mr-2" />
                                    <span className="text-gray-300">
                                        Next Maintenance
                                    </span>
                                </div>
                                <span className="text-white">
                                    {vehicleStatus.nextMaintenance}
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center">
                                    <RiHeartPulseLine className="text-gray-400 mr-2" />
                                    <span className="text-gray-300">
                                        Ambulance Type
                                    </span>
                                </div>
                                <span className="text-white">
                                    {vehicleStatus.ambulanceType}
                                </span>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center">
                                    <RiUserHeartLine className="text-gray-400 mr-2" />
                                    <span className="text-gray-300">
                                        Equipment Status
                                    </span>
                                </div>
                                <span className="text-green-400">
                                    {vehicleStatus.equipmentStatus}
                                </span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 w-full py-2 rounded-lg text-sm flex items-center justify-center"
                        >
                            <RiAlertLine className="mr-1" /> Report Issue
                        </motion.button>
                    </motion.div>

                    {/* Quick Contacts */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Quick Contacts
                        </h2>
                        <div className="space-y-3">
                            <motion.div
                                whileHover={{
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                }}
                                className="rounded-lg p-3 flex items-center"
                            >
                                <div className="bg-blue-500/20 p-2 rounded-full">
                                    <RiPhoneLine className="text-blue-400" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="font-medium text-white">
                                        Dispatch Center
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        Emergency Communication
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="ml-auto bg-blue-600 p-2 rounded-full"
                                >
                                    <RiPhoneLine className="text-white" />
                                </motion.button>
                            </motion.div>

                            <motion.div
                                whileHover={{
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                }}
                                className="rounded-lg p-3 flex items-center"
                            >
                                <div className="bg-green-500/20 p-2 rounded-full">
                                    <RiPhoneLine className="text-green-400" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="font-medium text-white">
                                        Maintenance Team
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        Vehicle Support
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="ml-auto bg-green-600 p-2 rounded-full"
                                >
                                    <RiPhoneLine className="text-white" />
                                </motion.button>
                            </motion.div>

                            <motion.div
                                whileHover={{
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                }}
                                className="rounded-lg p-3 flex items-center"
                            >
                                <div className="bg-purple-500/20 p-2 rounded-full">
                                    <RiPhoneLine className="text-purple-400" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="font-medium text-white">
                                        Technical Support
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        App & System Help
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="ml-auto bg-purple-600 p-2 rounded-full"
                                >
                                    <RiPhoneLine className="text-white" />
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default DriverDashboard;
