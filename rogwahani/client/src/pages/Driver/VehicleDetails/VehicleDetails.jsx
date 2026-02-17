import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    RiCarLine,
    RiGasStationLine,
    RiTimeLine,
    RiCarWashingLine,
    RiAlertLine,
    RiHistoryLine,
    RiFileTextLine,
    RiCalendarCheckLine,
    RiInformationLine,
    RiArrowLeftLine,
    RiSpeedLine,
    RiRoadMapLine,
    RiHeartPulseLine,
    RiFilePaperLine,
    RiOilLine,
    RiWheelchairLine,
    RiFirstAidKitLine,
    RiToolsLine,
    RiDashboardLine,
    RiFireLine,
    RiCheckboxCircleLine,
    RiCloseCircleLine,
    RiErrorWarningLine,
} from "react-icons/ri";

const VehicleDetails = () => {
    const [activeTab, setActiveTab] = useState("overview");

    // Sample data for vehicle details
    const vehicleInfo = {
        id: "AMB-KL-2023-5432",
        model: "Force Traveller T1 2023",
        type: "Basic Life Support",
        registrationNumber: "WB 01 AB 5432",
        assignedSince: "May 15, 2024",
        lastInspection: "Feb 15, 2025",
        nextInspection: "Mar 15, 2025",
        odometer: "24,567 km",
        insuranceValid: "Dec 31, 2025",
        pollutionValid: "Jul 20, 2025",
        status: "Active",
        fuelType: "Diesel",
        fuelEconomy: "10.5 km/l",
    };

    const fuelHistory = [
        {
            date: "Feb 23, 2025",
            amount: "35.4 L",
            cost: "₹3,540",
            odometer: "24,350 km",
        },
        {
            date: "Feb 18, 2025",
            amount: "40.2 L",
            cost: "₹4,020",
            odometer: "23,950 km",
        },
        {
            date: "Feb 12, 2025",
            amount: "32.8 L",
            cost: "₹3,280",
            odometer: "23,600 km",
        },
        {
            date: "Feb 05, 2025",
            amount: "38.5 L",
            cost: "₹3,850",
            odometer: "23,200 km",
        },
    ];

    const maintenanceHistory = [
        {
            date: "Jan 30, 2025",
            type: "Routine Service",
            description:
                "Engine oil change, filters replaced, brakes inspected",
            cost: "₹4,800",
            technician: "Amar Singh",
            status: "Completed",
        },
        {
            date: "Dec 15, 2024",
            type: "Tire Replacement",
            description: "Replaced all four tires with MRF ZLX 215/65 R15",
            cost: "₹26,000",
            technician: "Rajiv Kumar",
            status: "Completed",
        },
        {
            date: "Nov 10, 2024",
            type: "AC Repair",
            description: "Refrigerant recharge and compressor inspection",
            cost: "₹3,200",
            technician: "Sunil Verma",
            status: "Completed",
        },
    ];

    const upcomingMaintenance = [
        {
            date: "Mar 15, 2025",
            type: "Routine Service",
            description: "Engine oil change, filter replacement, fluid check",
            estimatedCost: "₹5,000",
        },
        {
            date: "Apr 20, 2025",
            type: "Brake Inspection",
            description: "Comprehensive brake system check and service",
            estimatedCost: "₹2,500",
        },
    ];

    const equipmentStatus = [
        {
            name: "Oxygen Cylinder",
            status: "Available",
            lastChecked: "Today, 8:00 AM",
            level: "85%",
        },
        {
            name: "Stretcher",
            status: "Available",
            lastChecked: "Today, 8:00 AM",
            condition: "Good",
        },
        {
            name: "First Aid Kit",
            status: "Available",
            lastChecked: "Today, 8:00 AM",
            condition: "Good",
        },
        {
            name: "Wheelchair",
            status: "Available",
            lastChecked: "Today, 8:00 AM",
            condition: "Good",
        },
        {
            name: "Defibrillator",
            status: "Available",
            lastChecked: "Today, 8:00 AM",
            batteryLevel: "92%",
        },
        {
            name: "Medical Supplies",
            status: "Needs Restocking",
            lastChecked: "Today, 8:00 AM",
            items: "Bandages, Tape",
        },
    ];

    const documents = [
        {
            name: "Vehicle Registration",
            expiryDate: "Dec 31, 2027",
            status: "Valid",
        },
        {
            name: "Insurance Policy",
            expiryDate: "Dec 31, 2025",
            status: "Valid",
        },
        {
            name: "Pollution Certificate",
            expiryDate: "Jul 20, 2025",
            status: "Valid",
        },
        {
            name: "Fitness Certificate",
            expiryDate: "Apr 15, 2025",
            status: "Valid",
        },
        { name: "Vehicle Manual", type: "PDF", size: "4.2 MB" },
    ];

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

    return (
        <div className="container mx-auto pt-12 pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center mb-6"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        Vehicle Details
                    </h1>
                    <p className="text-gray-400">
                        Manage and monitor your ambulance
                    </p>
                </div>
            </motion.div>

            {/* Vehicle Summary */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg"
            >
                <div className="flex flex-col md:flex-row gap-6">
                    <motion.div variants={itemVariants} className="md:w-1/4">
                        <div className="bg-gray-700 aspect-square rounded-lg flex items-center justify-center">
                            <RiCarLine size={120} className="text-gray-500" />
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="md:w-3/4">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    {vehicleInfo.model}
                                </h2>
                                <p className="text-gray-400">
                                    ID: {vehicleInfo.id} • Registration:{" "}
                                    {vehicleInfo.registrationNumber}
                                </p>
                            </div>
                            <span
                                className={`text-sm px-3 py-1 rounded-full ${
                                    vehicleInfo.status === "Active"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                }`}
                            >
                                {vehicleInfo.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Ambulance Type
                                </p>
                                <p className="text-white font-medium">
                                    {vehicleInfo.type}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Assigned Since
                                </p>
                                <p className="text-white font-medium">
                                    {vehicleInfo.assignedSince}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Odometer
                                </p>
                                <p className="text-white font-medium">
                                    {vehicleInfo.odometer}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Last Inspection
                                </p>
                                <p className="text-white font-medium">
                                    {vehicleInfo.lastInspection}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Next Inspection
                                </p>
                                <p className="text-white font-medium">
                                    {vehicleInfo.nextInspection}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Fuel Economy
                                </p>
                                <p className="text-white font-medium">
                                    {vehicleInfo.fuelEconomy}
                                </p>
                            </div>
                        </div>

                        <div className="flex mt-6 space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                            >
                                <RiAlertLine className="mr-2" /> Report Issue
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                            >
                                <RiFileTextLine className="mr-2" /> View
                                Documents
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="mb-6 overflow-x-auto">
                <div className="flex space-x-1 border-b border-gray-700 min-w-max">
                    <motion.button
                        whileHover={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        whileTap={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        className={`px-4 py-3 font-medium flex items-center ${
                            activeTab === "overview"
                                ? "text-red-500 border-b-2 border-red-500"
                                : "text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setActiveTab("overview")}
                    >
                        <RiInformationLine className="mr-2" /> Overview
                    </motion.button>
                    <motion.button
                        whileHover={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        whileTap={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        className={`px-4 py-3 font-medium flex items-center ${
                            activeTab === "maintenance"
                                ? "text-red-500 border-b-2 border-red-500"
                                : "text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setActiveTab("maintenance")}
                    >
                        <RiToolsLine className="mr-2" /> Maintenance
                    </motion.button>
                    <motion.button
                        whileHover={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        whileTap={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        className={`px-4 py-3 font-medium flex items-center ${
                            activeTab === "fuel"
                                ? "text-red-500 border-b-2 border-red-500"
                                : "text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setActiveTab("fuel")}
                    >
                        <RiGasStationLine className="mr-2" /> Fuel Log
                    </motion.button>
                    <motion.button
                        whileHover={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        whileTap={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        className={`px-4 py-3 font-medium flex items-center ${
                            activeTab === "equipment"
                                ? "text-red-500 border-b-2 border-red-500"
                                : "text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setActiveTab("equipment")}
                    >
                        <RiFirstAidKitLine className="mr-2" /> Equipment
                    </motion.button>
                    <motion.button
                        whileHover={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        whileTap={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        className={`px-4 py-3 font-medium flex items-center ${
                            activeTab === "documents"
                                ? "text-red-500 border-b-2 border-red-500"
                                : "text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setActiveTab("documents")}
                    >
                        <RiFilePaperLine className="mr-2" /> Documents
                    </motion.button>
                </div>
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Vehicle Status */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Vehicle Status
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-gray-400">
                                            Fuel Level
                                        </span>
                                        <span className="text-sm text-white">
                                            78%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: "78%" }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-gray-400">
                                            Oxygen Supply
                                        </span>
                                        <span className="text-sm text-white">
                                            85%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: "85%" }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-gray-400">
                                            Engine Health
                                        </span>
                                        <span className="text-sm text-green-400">
                                            Good
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: "92%" }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-gray-400">
                                            Tire Health
                                        </span>
                                        <span className="text-sm text-yellow-400">
                                            Fair
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-yellow-500 h-2 rounded-full"
                                            style={{ width: "68%" }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-yellow-400 text-sm flex items-start">
                                    <RiErrorWarningLine className="flex-shrink-0 mt-0.5 mr-2" />
                                    <span>
                                        Tire pressure check recommended.
                                        Front-right tire shows slightly lower
                                        pressure.
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Active Alerts */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Alerts & Reminders
                            </h3>

                            <div className="space-y-3">
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <div className="bg-yellow-500/20 text-yellow-500 p-2 rounded-full mr-3">
                                            <RiTimeLine />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">
                                                Routine Maintenance Due
                                            </h4>
                                            <p className="text-gray-400 text-sm">
                                                Scheduled for March 15, 2025
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 pl-12">
                                        Routine service including oil change,
                                        filter replacement, and fluid check.
                                    </p>
                                </div>

                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <div className="bg-yellow-500/20 text-yellow-500 p-2 rounded-full mr-3">
                                            <RiFirstAidKitLine />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">
                                                Medical Supplies Restocking
                                            </h4>
                                            <p className="text-gray-400 text-sm">
                                                Required within 2 days
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 pl-12">
                                        Bandages and medical tape inventory
                                        running low. Please restock soon.
                                    </p>
                                </div>

                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <div className="bg-green-500/20 text-green-500 p-2 rounded-full mr-3">
                                            <RiCheckboxCircleLine />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">
                                                Sanitization Completed
                                            </h4>
                                            <p className="text-gray-400 text-sm">
                                                Today, 7:30 AM
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 pl-12">
                                        Vehicle interior has been sanitized
                                        according to protocol.
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="mt-4 bg-gray-700 hover:bg-gray-600 w-full py-2 rounded-lg text-gray-300 text-sm flex items-center justify-center"
                            >
                                <RiHistoryLine className="mr-1" /> View All
                                Alerts
                            </motion.button>
                        </motion.div>

                        {/* Key Performance Metrics */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg md:col-span-2"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Performance Metrics
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <div className="bg-blue-500/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                                        <RiSpeedLine className="text-blue-400" />
                                    </div>
                                    <h4 className="text-lg font-medium text-white">
                                        3,254 km
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Distance This Month
                                    </p>
                                </div>

                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <div className="bg-green-500/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                                        <RiCarLine className="text-green-400" />
                                    </div>
                                    <h4 className="text-lg font-medium text-white">
                                        154
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Rides This Month
                                    </p>
                                </div>

                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <div className="bg-purple-500/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                                        <RiOilLine className="text-purple-400" />
                                    </div>
                                    <h4 className="text-lg font-medium text-white">
                                        10.5 km/l
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Avg. Fuel Economy
                                    </p>
                                </div>

                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <div className="bg-red-500/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                                        <RiAlertLine className="text-red-400" />
                                    </div>
                                    <h4 className="text-lg font-medium text-white">
                                        3
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        Active Alerts
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Maintenance Tab */}
                {activeTab === "maintenance" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Upcoming Maintenance */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg md:col-span-1"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Upcoming Maintenance
                            </h3>

                            <div className="space-y-4">
                                {upcomingMaintenance.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-700 p-4 rounded-lg"
                                    >
                                        <div className="flex items-center mb-2">
                                            <div className="bg-blue-500/20 text-blue-500 p-2 rounded-full mr-3">
                                                <RiCalendarCheckLine />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">
                                                    {item.type}
                                                </h4>
                                                <p className="text-gray-400 text-sm">
                                                    Scheduled: {item.date}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-300 pl-12 mb-2">
                                            {item.description}
                                        </p>
                                        <p className="text-sm text-gray-400 pl-12">
                                            Estimated Cost:{" "}
                                            <span className="text-white">
                                                {item.estimatedCost}
                                            </span>
                                        </p>
                                    </div>
                                ))}

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded-lg text-white text-sm flex items-center justify-center"
                                >
                                    <RiCalendarCheckLine className="mr-1" />{" "}
                                    Schedule Service
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Maintenance History */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg md:col-span-2"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Maintenance History
                            </h3>

                            <div className="space-y-4">
                                {maintenanceHistory.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{
                                            backgroundColor:
                                                "rgba(255,255,255,0.05)",
                                        }}
                                        className="border border-gray-700 p-4 rounded-lg"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center">
                                                <div className="bg-green-500/20 text-green-500 p-2 rounded-full mr-3">
                                                    <RiToolsLine />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-white">
                                                        {item.type}
                                                    </h4>
                                                    <p className="text-gray-400 text-sm">
                                                        Date: {item.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="pl-12 space-y-2">
                                            <p className="text-sm text-gray-300">
                                                {item.description}
                                            </p>
                                            <div className="flex justify-between text-sm">
                                                <p className="text-gray-400">
                                                    Technician:{" "}
                                                    <span className="text-white">
                                                        {item.technician}
                                                    </span>
                                                </p>
                                                <p className="text-gray-400">
                                                    Cost:{" "}
                                                    <span className="text-white">
                                                        {item.cost}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="mt-2 bg-gray-700 hover:bg-gray-600 w-full py-2 rounded-lg text-gray-300 text-sm flex items-center justify-center"
                                >
                                    <RiHistoryLine className="mr-1" /> View Full
                                    History
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Fuel Log Tab */}
                {activeTab === "fuel" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Fuel Statistics */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg md:col-span-1"
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Fuel Statistics
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-gray-400">
                                            Current Fuel Level
                                        </span>
                                        <span className="text-sm text-white">
                                            78%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: "78%" }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <h4 className="text-sm text-gray-400 mb-1">
                                            Estimated Range
                                        </h4>
                                        <p className="text-lg font-medium text-white">
                                            412 km
                                        </p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <h4 className="text-sm text-gray-400 mb-1">
                                            Last Refill
                                        </h4>
                                        <p className="text-lg font-medium text-white">
                                            Feb 23
                                        </p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <h4 className="text-sm text-gray-400 mb-1">
                                            Avg. Economy
                                        </h4>
                                        <p className="text-lg font-medium text-white">
                                            10.5 km/l
                                        </p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <h4 className="text-sm text-gray-400 mb-1">
                                            Monthly Cost
                                        </h4>
                                        <p className="text-lg font-medium text-white">
                                            ₹14,690
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-blue-400 text-sm flex items-start">
                                    <RiInformationLine className="flex-shrink-0 mt-0.5 mr-2" />
                                    <span>
                                        Next refueling recommended within 2 days
                                        based on your current schedule.
                                    </span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded-lg text-white text-sm flex items-center justify-center"
                                >
                                    <RiGasStationLine className="mr-1" /> Add
                                    Fuel Entry
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Fuel History */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg md:col-span-2"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-white">
                                    Fuel History
                                </h3>
                                <div className="flex space-x-2">
                                    <select className="bg-gray-700 text-white text-sm rounded-lg px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Last 30 Days</option>
                                        <option>Last 90 Days</option>
                                        <option>Last 6 Months</option>
                                        <option>All Time</option>
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-gray-400 border-b border-gray-700">
                                            <th className="text-left py-3 px-4">
                                                Date
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Amount
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Cost
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Odometer
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Economy
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fuelHistory.map((entry, index) => {
                                            // Calculate fuel economy for each entry (if possible)
                                            let economy = "—";
                                            if (
                                                index <
                                                fuelHistory.length - 1
                                            ) {
                                                const distanceTraveled =
                                                    parseInt(
                                                        entry.odometer.replace(
                                                            /,/g,
                                                            ""
                                                        )
                                                    ) -
                                                    parseInt(
                                                        fuelHistory[
                                                            index + 1
                                                        ].odometer.replace(
                                                            /,/g,
                                                            ""
                                                        )
                                                    );
                                                const fuelUsed = parseFloat(
                                                    entry.amount.split(" ")[0]
                                                );
                                                economy =
                                                    (
                                                        distanceTraveled /
                                                        fuelUsed
                                                    ).toFixed(1) + " km/l";
                                            }

                                            return (
                                                <motion.tr
                                                    key={index}
                                                    whileHover={{
                                                        backgroundColor:
                                                            "rgba(255,255,255,0.05)",
                                                    }}
                                                    className="border-b border-gray-700 text-white"
                                                >
                                                    <td className="py-3 px-4">
                                                        {entry.date}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {entry.amount}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {entry.cost}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {entry.odometer}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {economy}
                                                    </td>
                                                </motion.tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="mt-4 bg-gray-700 hover:bg-gray-600 w-full py-2 rounded-lg text-gray-300 text-sm flex items-center justify-center"
                            >
                                <RiHistoryLine className="mr-1" /> View Complete
                                Fuel Log
                            </motion.button>
                        </motion.div>
                    </div>
                )}

                {/* Equipment Tab */}
                {activeTab === "equipment" && (
                    <div className="grid grid-cols-1 gap-6">
                        {/* Equipment Status */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-white">
                                    Equipment Status
                                </h3>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
                                >
                                    <RiHistoryLine className="mr-1" /> Equipment
                                    Log
                                </motion.button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-gray-400 border-b border-gray-700">
                                            <th className="text-left py-3 px-4">
                                                Equipment
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Status
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Last Checked
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Condition
                                            </th>
                                            <th className="text-left py-3 px-4">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {equipmentStatus.map((item, index) => (
                                            <motion.tr
                                                key={index}
                                                whileHover={{
                                                    backgroundColor:
                                                        "rgba(255,255,255,0.05)",
                                                }}
                                                className="border-b border-gray-700 text-white"
                                            >
                                                <td className="py-3 px-4 font-medium">
                                                    <div className="flex items-center">
                                                        {item.name ===
                                                            "Oxygen Cylinder" && (
                                                            <RiHeartPulseLine className="mr-2 text-blue-400" />
                                                        )}
                                                        {item.name ===
                                                            "Stretcher" && (
                                                            <RiWheelchairLine className="mr-2 text-blue-400" />
                                                        )}
                                                        {item.name ===
                                                            "First Aid Kit" && (
                                                            <RiFirstAidKitLine className="mr-2 text-blue-400" />
                                                        )}
                                                        {item.name ===
                                                            "Wheelchair" && (
                                                            <RiWheelchairLine className="mr-2 text-blue-400" />
                                                        )}
                                                        {item.name ===
                                                            "Defibrillator" && (
                                                            <RiHeartPulseLine className="mr-2 text-blue-400" />
                                                        )}
                                                        {item.name ===
                                                            "Medical Supplies" && (
                                                            <RiFirstAidKitLine className="mr-2 text-blue-400" />
                                                        )}
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${
                                                            item.status ===
                                                            "Available"
                                                                ? "bg-green-500/20 text-green-400"
                                                                : "bg-yellow-500/20 text-yellow-400"
                                                        }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-400">
                                                    {item.lastChecked}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {item.level &&
                                                        `${item.level} Level`}
                                                    {item.condition &&
                                                        item.condition}
                                                    {item.batteryLevel &&
                                                        `Battery: ${item.batteryLevel}`}
                                                    {item.items && (
                                                        <span className="text-yellow-400">
                                                            Low: {item.items}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex space-x-2">
                                                        <motion.button
                                                            whileHover={{
                                                                scale: 1.1,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.9,
                                                            }}
                                                            className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded text-white"
                                                        >
                                                            <RiInformationLine
                                                                size={16}
                                                            />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{
                                                                scale: 1.1,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.9,
                                                            }}
                                                            className="bg-gray-700 hover:bg-gray-600 p-1.5 rounded text-white"
                                                        >
                                                            <RiHistoryLine
                                                                size={16}
                                                            />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex space-x-2 mt-4">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-green-600 hover:bg-green-700 flex-1 py-2 rounded-lg text-white text-sm flex items-center justify-center"
                                >
                                    <RiCheckboxCircleLine className="mr-1" />{" "}
                                    Mark Check Complete
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-red-600 hover:bg-red-700 flex-1 py-2 rounded-lg text-white text-sm flex items-center justify-center"
                                >
                                    <RiAlertLine className="mr-1" /> Report
                                    Issue
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Documents Tab */}
                {activeTab === "documents" && (
                    <div className="grid grid-cols-1 gap-6">
                        {/* Documents List */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-white">
                                    Vehicle Documents
                                </h3>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
                                >
                                    <RiFileTextLine className="mr-1" /> Upload
                                    Document
                                </motion.button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {documents.map((doc, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                                    >
                                        <div className="flex items-center">
                                            <div className="bg-blue-500/20 text-blue-500 p-2 rounded-full mr-3">
                                                <RiFileTextLine />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">
                                                    {doc.name}
                                                </h4>
                                                {doc.expiryDate && (
                                                    <p className="text-gray-400 text-sm">
                                                        Expires:{" "}
                                                        {doc.expiryDate}
                                                    </p>
                                                )}
                                                {doc.type && (
                                                    <p className="text-gray-400 text-sm">
                                                        {doc.type} • {doc.size}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            {doc.status && (
                                                <span
                                                    className={`px-2 py-1 mr-3 rounded-full text-xs ${
                                                        doc.status === "Valid"
                                                            ? "bg-green-500/20 text-green-400"
                                                            : "bg-red-500/20 text-red-400"
                                                    }`}
                                                >
                                                    {doc.status}
                                                </span>
                                            )}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="bg-gray-600 hover:bg-gray-500 p-2 rounded text-white"
                                            >
                                                <RiFileTextLine size={16} />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4 text-yellow-400 text-sm flex items-start">
                                <RiErrorWarningLine className="flex-shrink-0 mt-0.5 mr-2" />
                                <div>
                                    <p className="font-medium">
                                        Documents Expiring Soon
                                    </p>
                                    <p>
                                        Fitness Certificate will expire in 48
                                        days. Consider renewal process soon.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default VehicleDetails;
