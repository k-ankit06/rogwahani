import React from "react";
import { motion } from "framer-motion";
import {
    FaPhoneAlt,
    FaUserMd,
    FaAmbulance,
    FaHospital,
    FaClock,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { IoMdPulse } from "react-icons/io";
import { BsArrowRightShort, BsShieldCheck } from "react-icons/bs";
import ambulance from "./../../assets/ambulance.jpg";

const LandingPageHero = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-20 left-20 w-72 h-72 rounded-full bg-red-600/10 filter blur-3xl"
                animate={{
                    x: [0, 30, 0],
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-red-800/10 filter blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left content section */}
                    <motion.div
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Status indicators */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center space-x-6"
                        >
                            <div className="flex items-center space-x-2">
                                <motion.div
                                    className="w-3 h-3 bg-green-500 rounded-full"
                                    variants={pulseVariants}
                                    animate="pulse"
                                ></motion.div>
                                <span className="text-green-400 font-medium">
                                    24/7 Service
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <motion.div
                                    className="w-3 h-3 bg-red-500 rounded-full"
                                    variants={pulseVariants}
                                    animate="pulse"
                                ></motion.div>
                                <span className="text-red-400 font-medium">
                                    SOS Response
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <motion.div
                                    className="w-3 h-3 bg-blue-500 rounded-full"
                                    variants={pulseVariants}
                                    animate="pulse"
                                ></motion.div>
                                <span className="text-blue-400 font-medium">
                                    GPS Tracking
                                </span>
                            </div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl font-bold leading-tight"
                        >
                            <span className="text-white">Swift </span>
                            <span className="relative">
                                <span className="text-red-600">Emergency</span>
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-full h-1 bg-red-600/50 rounded-full"
                                    animate={{
                                        width: ["0%", "100%", "0%"],
                                        left: ["0%", "0%", "100%"],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                ></motion.span>
                            </span>
                            <br />
                            <span className="text-white">Response</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={itemVariants}
                            className="text-gray-300 text-lg leading-relaxed"
                        >
                            One-tap ambulance service that arrives in minutes.
                            <span className="block mt-2 font-semibold text-white">
                                When every moment matters, trust our rapid
                                response team.
                            </span>
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
                        >
                            <motion.button
                                className="group relative bg-red-600 text-white w-full sm:w-auto px-8 py-3 rounded-xl text-lg font-bold flex items-center justify-center space-x-2 overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.span
                                    className="absolute -inset-full bg-gradient-to-r from-red-800 to-red-600"
                                    animate={{
                                        left: ["-100%", "100%"],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    style={{ opacity: 0.3 }}
                                ></motion.span>
                                <FaPhoneAlt className="text-lg" />
                                <span>Emergency Call</span>
                            </motion.button>

                            <motion.a
                                href="#services"
                                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                <span>Our Services</span>
                                <BsArrowRightShort className="text-xl" />
                            </motion.a>
                        </motion.div>

                        {/* Stats section */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-gray-800"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                    <IoMdPulse className="text-red-500 text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">
                                        3.5{" "}
                                        <span className="text-red-500">
                                            min
                                        </span>
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Average response time
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                    <FaUserMd className="text-red-500 text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">
                                        100+{" "}
                                        <span className="text-red-500">
                                            Medics
                                        </span>
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Expert medical team
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                    <BsShieldCheck className="text-red-500 text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">
                                        15K+{" "}
                                        <span className="text-red-500">
                                            Saved
                                        </span>
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Lives this year
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right image section */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            ></motion.div>

                            <motion.img
                                src={ambulance}
                                alt="Emergency Ambulance Service"
                                className="w-full h-auto object-cover"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5 }}
                            />

                            {/* Floating cards */}
                            <motion.div
                                className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 shadow-xl z-20"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1.2 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                        <FaClock className="text-red-500 text-lg" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white">
                                            Fast{" "}
                                            <span className="text-red-500">
                                                Response
                                            </span>
                                        </div>
                                        <div className="text-gray-400 text-xs">
                                            Nationwide coverage
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute top-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 shadow-xl z-20"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1.5 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-red-500 text-lg" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white">
                                            GPS{" "}
                                            <span className="text-red-500">
                                                Tracking
                                            </span>
                                        </div>
                                        <div className="text-gray-400 text-xs">
                                            Real-time location updates
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Floating ambulance icon with pulse effect */}
                        <motion.div
                            className="absolute -top-6 -right-6 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg z-30"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                delay: 1.8,
                            }}
                        >
                            <FaAmbulance className="text-white text-2xl" />
                            <motion.div
                                className="absolute inset-0 rounded-full bg-red-600"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.8, 0, 0.8],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            ></motion.div>
                        </motion.div>

                        {/* Hospital icon */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center shadow-lg z-30 border-2 border-gray-700"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                delay: 2,
                            }}
                        >
                            <FaHospital className="text-red-500 text-2xl" />
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/10 rounded-full filter blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full filter blur-2xl"></div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LandingPageHero;
