import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    RiMapPinLine,
    RiTimeLine,
    RiPhoneLine,
    RiUserHeartLine,
    RiRoadMapLine,
    RiUserLocationLine,
    RiSyringeLine,
    RiHeartPulseLine,
    RiHospitalLine,
    RiHome4Line,
    RiArrowRightLine,
    RiArrowLeftLine,
    RiGpsLine,
    RiCalendarCheckLine,
    RiInformationLine,
    RiCheckLine,
    RiErrorWarningLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";

const TrackAmbulance = () => {
    const { user } = useSelector((state) => state.auth);
    const [selectedRide, setSelectedRide] = useState(null);
    const [mapFullscreen, setMapFullscreen] = useState(false);

    // Sample data for the tracking page
    const activeRides = [
        {
            id: 1,
            type: "Emergency",
            from: "Home",
            to: "Apollo Hospital",
            date: "Today, 2:30 PM",
            status: "In Transit",
            driver: {
                name: "Rajesh Kumar",
                phone: "+91 9876543210",
                rating: 4.8,
                vehicleNo: "KA-01-AB-1234",
            },
            patient: "John Doe",
            eta: "7 mins",
            distance: "2.5 km",
            ambulanceType: "Advanced Life Support",
            currentLocation: "MG Road",
            statusHistory: [
                {
                    status: "Request Received",
                    time: "2:15 PM",
                    completed: true,
                },
                { status: "Driver Assigned", time: "2:17 PM", completed: true },
                {
                    status: "Ambulance Dispatched",
                    time: "2:20 PM",
                    completed: true,
                },
                { status: "In Transit", time: "2:22 PM", completed: true },
                {
                    status: "Arriving at Location",
                    time: "2:36 PM",
                    completed: false,
                },
                {
                    status: "Reached Hospital",
                    time: "3:05 PM",
                    completed: false,
                },
            ],
        },
        {
            id: 2,
            type: "Non-Emergency",
            from: "Office",
            to: "City Hospital",
            date: "Today, 4:00 PM",
            status: "Driver Assigned",
            driver: {
                name: "Suresh Patel",
                phone: "+91 9876543211",
                rating: 4.6,
                vehicleNo: "KA-01-CD-5678",
            },
            patient: "Jane Smith",
            eta: "15 mins",
            distance: "5.8 km",
            ambulanceType: "Basic Life Support",
            currentLocation: "Brigade Road",
            statusHistory: [
                {
                    status: "Request Received",
                    time: "3:45 PM",
                    completed: true,
                },
                { status: "Driver Assigned", time: "3:52 PM", completed: true },
                {
                    status: "Ambulance Dispatched",
                    time: "4:00 PM",
                    completed: false,
                },
                { status: "In Transit", time: "4:10 PM", completed: false },
                {
                    status: "Arriving at Location",
                    time: "4:25 PM",
                    completed: false,
                },
                {
                    status: "Reached Hospital",
                    time: "4:55 PM",
                    completed: false,
                },
            ],
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

    const mapVariants = {
        normal: {
            height: "400px",
            width: "100%",
            borderRadius: "0.5rem",
        },
        fullscreen: {
            height: "calc(100vh - 180px)",
            width: "100%",
            borderRadius: "0.5rem",
        },
    };

    const handleRideSelect = (ride) => {
        setSelectedRide(ride);
    };

    const toggleMapFullscreen = () => {
        setMapFullscreen(!mapFullscreen);
    };

    return (
        <div className="container mx-auto pt-12">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Track Your Ambulance
                </h1>
                <p className="text-gray-400">
                    Monitor the live location and status of your ambulance
                    booking
                </p>
            </motion.div>

            {/* Main Content */}
            <div
                className={`grid ${selectedRide && !mapFullscreen ? "grid-cols-1 lg:grid-cols-3 gap-6" : "grid-cols-1"}`}
            >
                {/* Left Column - Active Rides */}
                {(!selectedRide || mapFullscreen) && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={`${selectedRide ? "lg:col-span-1" : "lg:col-span-3"}`}
                    >
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-white">
                                    Active Rides
                                </h2>
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm"
                                >
                                    {activeRides.length} Active
                                </motion.span>
                            </div>

                            <div className="space-y-4">
                                {activeRides.length > 0 ? (
                                    activeRides.map((ride) => (
                                        <motion.div
                                            key={ride.id}
                                            whileHover={{ x: 5 }}
                                            className={`bg-gray-700 rounded-lg p-4 cursor-pointer border-l-4 ${
                                                selectedRide?.id === ride.id
                                                    ? "border-red-500"
                                                    : "border-transparent"
                                            }`}
                                            onClick={() =>
                                                handleRideSelect(ride)
                                            }
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div
                                                        className={`p-3 rounded-full ${
                                                            ride.type ===
                                                            "Emergency"
                                                                ? "bg-red-500/20 text-red-500"
                                                                : "bg-blue-500/20 text-blue-500"
                                                        }`}
                                                    >
                                                        {ride.type ===
                                                        "Emergency" ? (
                                                            <RiHeartPulseLine
                                                                size={20}
                                                            />
                                                        ) : (
                                                            <RiCalendarCheckLine
                                                                size={20}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="font-medium text-white">
                                                            {ride.type} Ride
                                                        </h3>
                                                        <div className="flex items-center text-sm text-gray-400">
                                                            <RiHome4Line className="mr-1" />
                                                            <span>
                                                                {ride.from}
                                                            </span>
                                                            <RiArrowRightLine className="mx-1" />
                                                            <RiHospitalLine className="mr-1" />
                                                            <span>
                                                                {ride.to}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-white text-sm">
                                                        {ride.date}
                                                    </p>
                                                    <div className="flex items-center">
                                                        <RiTimeLine className="text-gray-400 mr-1" />
                                                        <span className="text-sm text-gray-400">
                                                            ETA: {ride.eta}
                                                        </span>
                                                    </div>
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full ${
                                                            ride.status ===
                                                            "In Transit"
                                                                ? "bg-green-500/20 text-green-400"
                                                                : ride.status ===
                                                                    "Driver Assigned"
                                                                  ? "bg-yellow-500/20 text-yellow-400"
                                                                  : "bg-blue-500/20 text-blue-400"
                                                        }`}
                                                    >
                                                        {ride.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 text-center py-4">
                                        No active rides
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Book Now Section (when no ride is selected) */}
                        {!selectedRide && (
                            <motion.div
                                variants={itemVariants}
                                className="bg-gradient-to-r from-red-700 to-red-900 rounded-lg p-6 shadow-lg"
                            >
                                <h2 className="text-xl font-semibold text-white mb-3">
                                    Need an ambulance?
                                </h2>
                                <p className="text-red-200 mb-4">
                                    Book an ambulance quickly for emergency or
                                    scheduled medical transport.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-white text-red-700 py-3 rounded-lg font-medium flex items-center justify-center"
                                >
                                    <RiSyringeLine className="mr-2" /> Book Now
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Right Column - Tracking Details (when a ride is selected) */}
                {selectedRide && !mapFullscreen && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Map Section */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-white">
                                    Live Tracking
                                </h2>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-red-500 flex items-center text-sm"
                                    onClick={toggleMapFullscreen}
                                >
                                    Expand Map{" "}
                                    <RiArrowRightLine className="ml-1" />
                                </motion.button>
                            </div>

                            <motion.div
                                className="relative bg-gray-700 rounded-lg overflow-hidden"
                                variants={mapVariants}
                                initial="normal"
                                animate={
                                    mapFullscreen ? "fullscreen" : "normal"
                                }
                            >
                                {/* Map Placeholder */}
                                <div className="h-full w-full bg-gray-700 flex items-center justify-center">
                                    <div className="text-center">
                                        <RiMapPinLine className="text-red-500 text-5xl mx-auto mb-4" />
                                        <p className="text-gray-400">
                                            Map visualization would appear here
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Current location:{" "}
                                            {selectedRide.currentLocation}
                                        </p>
                                    </div>
                                </div>

                                {/* Map Controls */}
                                <div className="absolute top-4 right-4 space-y-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-gray-800 p-2 rounded-full text-white shadow-lg"
                                    >
                                        <RiGpsLine />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-gray-800 p-2 rounded-full text-white shadow-lg"
                                    >
                                        <RiUserLocationLine />
                                    </motion.button>
                                </div>

                                {/* ETA Info */}
                                <div className="absolute bottom-4 left-4 right-4 bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-medium">
                                                ETA: {selectedRide.eta}
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                {selectedRide.distance}{" "}
                                                remaining
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-medium">
                                                {selectedRide.ambulanceType}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {selectedRide.driver.vehicleNo}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Driver Info & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                variants={itemVariants}
                                className="bg-gray-800 rounded-lg p-6 shadow-lg md:col-span-1"
                            >
                                <h2 className="text-lg font-semibold text-white mb-4">
                                    Driver Details
                                </h2>
                                <div className="flex flex-col items-center mb-4">
                                    <div className="bg-gray-700 rounded-full p-5 mb-3">
                                        <RiUserHeartLine className="text-3xl text-red-500" />
                                    </div>
                                    <h3 className="text-white font-medium">
                                        {selectedRide.driver.name}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        <span className="text-yellow-400 mr-1">
                                            ★
                                        </span>
                                        <span className="text-gray-300">
                                            {selectedRide.driver.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-700 pt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-400">
                                            Vehicle
                                        </span>
                                        <span className="text-white">
                                            {selectedRide.driver.vehicleNo}
                                        </span>
                                    </div>
                                    <motion.a
                                        href={`tel:${selectedRide.driver.phone}`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium flex items-center justify-center"
                                    >
                                        <RiPhoneLine className="mr-2" /> Call
                                        Driver
                                    </motion.a>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="bg-gray-800 rounded-lg p-6 shadow-lg md:col-span-2"
                            >
                                <h2 className="text-lg font-semibold text-white mb-4">
                                    Tracking Status
                                </h2>
                                <div className="space-y-4">
                                    {selectedRide.statusHistory.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start"
                                            >
                                                <div
                                                    className={`mt-1 rounded-full w-6 h-6 flex items-center justify-center ${
                                                        item.completed
                                                            ? "bg-green-500"
                                                            : "bg-gray-600"
                                                    }`}
                                                >
                                                    {item.completed ? (
                                                        <RiCheckLine className="text-white text-sm" />
                                                    ) : (
                                                        <RiErrorWarningLine className="text-white text-sm" />
                                                    )}
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <div className="flex justify-between">
                                                        <h3
                                                            className={`font-medium ${item.completed ? "text-white" : "text-gray-400"}`}
                                                        >
                                                            {item.status}
                                                        </h3>
                                                        <span className="text-gray-500 text-sm">
                                                            {item.time}
                                                        </span>
                                                    </div>
                                                    {index <
                                                        selectedRide
                                                            .statusHistory
                                                            .length -
                                                            1 && (
                                                        <div className="h-10 w-0.5 bg-gray-700 ml-3"></div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Ride Details */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg"
                        >
                            <h2 className="text-lg font-semibold text-white mb-4">
                                Ride Details
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Patient
                                        </p>
                                        <p className="text-white">
                                            {selectedRide.patient}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            From
                                        </p>
                                        <p className="text-white flex items-center">
                                            <RiHome4Line className="mr-2 text-red-500" />{" "}
                                            {selectedRide.from}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            To
                                        </p>
                                        <p className="text-white flex items-center">
                                            <RiHospitalLine className="mr-2 text-red-500" />{" "}
                                            {selectedRide.to}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Type
                                        </p>
                                        <p className="text-white">
                                            {selectedRide.ambulanceType}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Date & Time
                                        </p>
                                        <p className="text-white">
                                            {selectedRide.date}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Status
                                        </p>
                                        <p
                                            className={`${
                                                selectedRide.status ===
                                                "In Transit"
                                                    ? "text-green-400"
                                                    : selectedRide.status ===
                                                        "Driver Assigned"
                                                      ? "text-yellow-400"
                                                      : "text-blue-400"
                                            }`}
                                        >
                                            {selectedRide.status}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium flex items-center justify-center"
                                    onClick={() => setSelectedRide(null)}
                                >
                                    <RiArrowLeftLine className="mr-2" /> Back to
                                    List
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-medium flex items-center justify-center"
                                >
                                    <RiInformationLine className="mr-2" />{" "}
                                    Support
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Fullscreen Map */}
                {selectedRide && mapFullscreen && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-3"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-white">
                                    Live Tracking
                                </h2>
                                <div className="flex items-center">
                                    <span className="text-gray-400 mr-3">
                                        <span className="text-red-500 font-medium">
                                            {selectedRide.eta}
                                        </span>{" "}
                                        ETA
                                    </span>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-red-500 flex items-center text-sm"
                                        onClick={toggleMapFullscreen}
                                    >
                                        <RiArrowLeftLine className="mr-1" />{" "}
                                        Back to Details
                                    </motion.button>
                                </div>
                            </div>

                            <motion.div
                                className="bg-gray-700 rounded-lg overflow-hidden"
                                initial={{ height: "400px" }}
                                animate={{ height: "calc(100vh - 250px)" }}
                            >
                                {/* Map Placeholder */}
                                <div className="h-full w-full bg-gray-700 flex items-center justify-center">
                                    <div className="text-center">
                                        <RiMapPinLine className="text-red-500 text-5xl mx-auto mb-4" />
                                        <p className="text-gray-400">
                                            Map visualization would appear here
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Current location:{" "}
                                            {selectedRide.currentLocation}
                                        </p>
                                    </div>
                                </div>

                                {/* Map Controls */}
                                <div className="absolute top-4 right-4 space-y-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-gray-800 p-2 rounded-full text-white shadow-lg"
                                    >
                                        <RiGpsLine />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-gray-800 p-2 rounded-full text-white shadow-lg"
                                    >
                                        <RiUserLocationLine />
                                    </motion.button>
                                </div>

                                {/* Driver Info Panel */}
                                <div className="absolute bottom-4 left-4 right-4 bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="bg-gray-700 rounded-full p-3">
                                                <RiUserHeartLine className="text-xl text-red-500" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-white font-medium">
                                                    {selectedRide.driver.name}
                                                </h3>
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400 mr-1">
                                                        ★
                                                    </span>
                                                    <span className="text-gray-300 text-sm">
                                                        {
                                                            selectedRide.driver
                                                                .rating
                                                        }
                                                    </span>
                                                    <span className="mx-2 text-gray-500">
                                                        |
                                                    </span>
                                                    <span className="text-gray-300 text-sm">
                                                        {
                                                            selectedRide.driver
                                                                .vehicleNo
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <motion.a
                                            href={`tel:${selectedRide.driver.phone}`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium flex items-center"
                                        >
                                            <RiPhoneLine className="mr-2" />{" "}
                                            Call
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Emergency Contact - Only show when no ride is selected */}
            {!selectedRide && (
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gradient-to-r from-red-700 to-red-900 rounded-lg p-6 shadow-lg mt-6"
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
                </motion.div>
            )}
        </div>
    );
};

export default TrackAmbulance;
