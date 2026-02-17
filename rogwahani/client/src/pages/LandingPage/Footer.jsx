import React from "react";
import { motion } from "framer-motion";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaHandHoldingMedical,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaClock,
    FaCalendarCheck,
    FaAmbulance,
    FaUserMd,
    FaHeadset,
    FaStar,
    FaQuoteLeft,
    FaHospital,
    FaHeartbeat,
} from "react-icons/fa";
import { MdEmergency, MdSupportAgent, MdLocationOn } from "react-icons/md";
import ambulance from "./../../assets/ambulance.jpg";

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-400 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-6">
                            Rogwahani
                        </h3>
                        <p className="mb-6">
                            Providing emergency ambulance services when every
                            second counts.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <FaFacebook className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <FaTwitter className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <FaInstagram className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <FaLinkedin className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-red-500 transition-colors"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    className="hover:text-red-500 transition-colors"
                                >
                                    Our Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#book"
                                    className="hover:text-red-500 transition-colors"
                                >
                                    Book Ambulance
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="hover:text-red-500 transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#testimonials"
                                    className="hover:text-red-500 transition-colors"
                                >
                                    Testimonials
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="hover:text-red-500 transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-6">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <FaPhone className="text-red-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p>Emergency:</p>
                                    <p className="text-white">
                                        +91 1800-ROGWAHANI
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <FaEnvelope className="text-red-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p>Email:</p>
                                    <p className="text-white">
                                        help@rogwahani.com
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                                <div>
                                    <p>Main Office:</p>
                                    <p className="text-white">
                                        123 Emergency Lane, Mumbai, India
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Operating Hours */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-6">
                            Operating Hours
                        </h3>
                        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                            <div className="flex items-center mb-4">
                                <FaClock className="text-red-500 mr-2" />
                                <p className="text-white font-bold">
                                    Always Open
                                </p>
                            </div>
                            <p className="mb-2">Emergency Services:</p>
                            <p className="text-white font-medium mb-3">
                                24/7, 365 days
                            </p>
                            <p className="mb-2">Booking Office:</p>
                            <p className="text-white font-medium">
                                Mon-Sat: 8am - 8pm
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p>© 2025 Rogwahani. All rights reserved.</p>
                        <div className="mt-4 md:mt-0">
                            <a
                                href="#"
                                className="text-sm mr-4 hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-sm mr-4 hover:text-white transition-colors"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-sm hover:text-white transition-colors"
                            >
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
