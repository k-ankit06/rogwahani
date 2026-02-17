import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Ri24HoursFill,
    Ri4kFill,
    RiHospitalLine,
    RiUserHeartLine,
    RiMapPinLine,
    RiTimeLine,
    RiEyeLine,
    RiBookmarkLine,
    RiArrowRightLine,
    RiPhoneLine,
    RiHeartPulseLine,
    RiSyringeLine,
    RiCarWashingLine,
    RiCalendarCheckLine,
    RiLineChartLine,
    RiPieChartLine,
    RiAlertLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";

const UserDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [selectedService, setSelectedService] = useState(null);

    // Sample data for dashboard
    const quickActions = [
        {
            id: 1,
            name: "SOS Emergency",
            icon: <Ri4kFill />,
            color: "bg-red-600",
            path: "/sos",
        },
        {
            id: 2,
            name: "Book Ambulance",
            icon: <Ri24HoursFill />,
            color: "bg-red-500",
            path: "/book-ambulance",
        },
        {
            id: 3,
            name: "Track Booking",
            icon: <RiMapPinLine />,
            color: "bg-red-400",
            path: "/track",
        },
        {
            id: 4,
            name: "Medical History",
            icon: <RiUserHeartLine />,
            color: "bg-red-500",
            path: "/medical-history",
        },
    ];

    const upcomingRides = [
        {
            id: 1,
            type: "Emergency",
            from: "Home",
            to: "Apollo Hospital",
            date: "Today, 2:30 PM",
            status: "Confirmed",
        },
        {
            id: 2,
            type: "Non-Emergency",
            from: "Office",
            to: "City Hospital",
            date: "Tomorrow, 10:00 AM",
            status: "Scheduled",
        },
    ];

    const services = [
        {
            id: 1,
            name: "Critical Care",
            icon: <RiAlertLine />,
            description: "Advanced life support for critical patients",
            bookings: 3,
        },
        {
            id: 2,
            name: "Patient Transfer",
            icon: <RiHospitalLine />,
            description: "Safe transfers between medical facilities",
            bookings: 7,
        },
        {
            id: 3,
            name: "Medical Appointments",
            icon: <RiCalendarCheckLine />,
            description: "Transportation for scheduled appointments",
            bookings: 12,
        },
        {
            id: 4,
            name: "Post-Surgery Care",
            icon: <RiSyringeLine />,
            description: "Specialized transport after surgery",
            bookings: 5,
        },
        {
            id: 5,
            name: "Dialysis Transport",
            icon: <RiHeartPulseLine />,
            description: "Regular transport for dialysis patients",
            bookings: 4,
        },
        {
            id: 6,
            name: "Sanitized Transport",
            icon: <RiCarWashingLine />,
            description: "Sanitized vehicles for immunocompromised patients",
            bookings: 2,
        },
    ];

    const statistics = [
        {
            id: 1,
            title: "Total Bookings",
            value: 38,
            icon: <RiLineChartLine />,
            change: "+12%",
            color: "bg-blue-500",
        },
        {
            id: 2,
            title: "Response Time",
            value: "4.2 min",
            icon: <RiTimeLine />,
            change: "-0.8 min",
            color: "bg-green-500",
        },
        {
            id: 3,
            title: "Saved Locations",
            value: 7,
            icon: <RiMapPinLine />,
            change: "+2",
            color: "bg-yellow-500",
        },
        {
            id: 4,
            title: "Available Ambulances",
            value: 24,
            icon: <Ri24HoursFill />,
            change: "+5",
            color: "bg-purple-500",
        },
    ];

    const nearbyHospitals = [
        {
            id: 1,
            name: "City Hospital",
            distance: "2.5 km",
            time: "8 min",
            type: "Multi-Specialty",
        },
        {
            id: 2,
            name: "Apollo Medical Center",
            distance: "3.8 km",
            time: "12 min",
            type: "Cardiac & Trauma",
        },
        {
            id: 3,
            name: "Life Care Hospital",
            distance: "4.2 km",
            time: "15 min",
            type: "Emergency & ICU",
        },
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

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    return (
        <div className="container mx-auto pt-12">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.name || "User"}
                </h1>
                <p className="text-gray-400">
                    Need emergency assistance or planning a medical transport?
                    We're here to help.
                </p>
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
                {/* Left Column - Upcoming Rides & Statistics */}
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
                                        className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                                    >
                                        <div className="flex items-center">
                                            <div
                                                className={`p-3 rounded-full ${ride.type === "Emergency" ? "bg-red-500/20 text-red-500" : "bg-blue-500/20 text-blue-500"}`}
                                            >
                                                {ride.type === "Emergency" ? (
                                                    <Ri4kFill size={20} />
                                                ) : (
                                                    <Ri24HoursFill size={20} />
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="font-medium text-white">
                                                    {ride.type} Ride
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    {ride.from} → {ride.to}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white text-sm">
                                                {ride.date}
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${ride.status === "Confirmed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                                            >
                                                {ride.status}
                                            </span>
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
                                    {stat.change} from last month
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Nearby Hospitals */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-white">
                                Nearby Hospitals
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-red-500 flex items-center text-sm"
                            >
                                View Map <RiMapPinLine className="ml-1" />
                            </motion.button>
                        </div>

                        <div className="space-y-3">
                            {nearbyHospitals.map((hospital) => (
                                <motion.div
                                    key={hospital.id}
                                    whileHover={{
                                        backgroundColor:
                                            "rgba(255,255,255,0.05)",
                                    }}
                                    className="p-3 rounded-lg flex justify-between items-center border-b border-gray-700"
                                >
                                    <div className="flex items-center">
                                        <div className="bg-blue-500/20 p-2 rounded-full">
                                            <RiHospitalLine className="text-blue-400" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium text-white">
                                                {hospital.name}
                                            </h3>
                                            <p className="text-xs text-gray-400">
                                                {hospital.type}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white text-sm">
                                            {hospital.distance}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {hospital.time} by ambulance
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column - Services & Emergency Contact */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Our Services */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Our Services
                        </h2>
                        <div className="space-y-3">
                            {services.map((service) => (
                                <motion.div
                                    key={service.id}
                                    whileHover={{
                                        backgroundColor:
                                            "rgba(255,255,255,0.05)",
                                    }}
                                    onClick={() => handleServiceClick(service)}
                                    className={`p-3 rounded-lg cursor-pointer border-l-4 ${selectedService?.id === service.id ? "border-red-500 bg-gray-700" : "border-transparent"}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="bg-red-500/20 p-2 rounded-full text-red-400">
                                                {service.icon}
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="font-medium text-white">
                                                    {service.name}
                                                </h3>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                                            {service.bookings} booked
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                        >
                            <RiBookmarkLine className="mr-2" /> Book a Service
                        </motion.button>
                    </motion.div>

                    {/* Emergency Contact */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-red-700 to-red-900 rounded-lg p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-semibold text-white mb-3">
                            24/7 Emergency Hotline
                        </h2>
                        <p className="text-red-200 mb-4">
                            Our emergency team is available round the clock.
                        </p>

                        <motion.a
                            href="tel:108"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-red-700 flex items-center justify-center py-3 rounded-lg font-bold text-xl mt-2"
                        >
                            <RiPhoneLine className="mr-2" /> 108
                        </motion.a>

                        <div className="flex justify-between mt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-red-600/40 hover:bg-red-600/60 text-white px-4 py-2 rounded-lg flex items-center"
                            >
                                <RiEyeLine className="mr-2" /> View Contacts
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-red-600/40 hover:bg-red-600/60 text-white px-4 py-2 rounded-lg flex items-center"
                            >
                                <Ri4kFill className="mr-2" /> SOS
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserDashboard;
