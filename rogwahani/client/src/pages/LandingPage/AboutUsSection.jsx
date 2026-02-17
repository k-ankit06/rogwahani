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

const AboutUsSection = () => {
    return (
        <section
            id="about"
            className="py-20 bg-gradient-to-b from-black to-gray-900"
        >
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image Area */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-red-500/10">
                            {/* Placeholder for ambulance image */}
                            <div className="w-full h-full bg-gray-800 rounded-xl">
                                <motion.img
                                    src={ambulance}
                                    alt="Emergency Ambulance Service"
                                    className="w-full h-auto object-cover"
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1.5 }}
                                />
                            </div>
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -bottom-6 -right-6 bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-800 max-w-xs">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mr-4">
                                    <FaClock className="text-red-500 text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">
                                        10 Minutes
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        Average Response Time
                                    </p>
                                </div>
                            </div>
                            <div className="w-full bg-gray-800 h-2 rounded-full mb-2">
                                <div
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ width: "92%" }}
                                ></div>
                            </div>
                            <p className="text-gray-400 text-xs">
                                Faster than 92% of service providers
                            </p>
                        </div>
                    </motion.div>

                    {/* Content Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block">
                            <span className="px-3 py-1 bg-red-600/10 text-red-500 rounded-full text-sm font-medium">
                                About Us
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-white">
                            India's Most Trusted Emergency Medical Service
                        </h2>

                        <p className="text-gray-400 mb-8">
                            Founded in 2020, Rogwahani has revolutionized
                            emergency medical services across India. We combine
                            cutting-edge technology with highly trained medical
                            professionals to provide the fastest and most
                            reliable ambulance services in the country.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="flex">
                                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                    <FaCalendarCheck className="text-red-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">
                                        Reliable & Fast Response
                                    </h3>
                                    <p className="text-gray-400">
                                        Our advanced dispatch system ensures
                                        that help arrives quickly when you need
                                        it most, with an average response time
                                        of just 10 minutes.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                    <FaUserMd className="text-red-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">
                                        Expert Medical Team
                                    </h3>
                                    <p className="text-gray-400">
                                        Our ambulances are staffed with
                                        certified paramedics and emergency
                                        medical technicians who undergo rigorous
                                        training and regular skill updates.
                                    </p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                    <MdSupportAgent className="text-red-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-2">
                                        24/7 Customer Support
                                    </h3>
                                    <p className="text-gray-400">
                                        Our dedicated support team is available
                                        around the clock to assist you with
                                        bookings, inquiries, and any concerns
                                        you may have.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <a
                                href="#services"
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center"
                            >
                                Our Services <FaAmbulance className="ml-2" />
                            </a>
                            <a
                                href="#book"
                                className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500/10 font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center"
                            >
                                Book Now <MdLocationOn className="ml-2" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Why Choose Us Cards */}
                <div className="mt-20">
                    <motion.h3
                        className="text-2xl font-bold mb-10 text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Why Choose Rogwahani
                    </motion.h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-red-500/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="w-14 h-14 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
                                <FaHeartbeat className="text-red-500 text-2xl" />
                            </div>
                            <h4 className="text-lg font-bold mb-2 text-white">
                                Life-Saving Speed
                            </h4>
                            <p className="text-gray-400">
                                Our strategically located ambulances ensure we
                                reach you within minutes of your emergency call.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-red-500/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="w-14 h-14 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
                                <FaHeadset className="text-red-500 text-2xl" />
                            </div>
                            <h4 className="text-lg font-bold mb-2 text-white">
                                Compassionate Care
                            </h4>
                            <p className="text-gray-400">
                                Our staff is trained to provide not just medical
                                care but also emotional support during critical
                                situations.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-red-500/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="w-14 h-14 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
                                <FaHospital className="text-red-500 text-2xl" />
                            </div>
                            <h4 className="text-lg font-bold mb-2 text-white">
                                Hospital Network
                            </h4>
                            <p className="text-gray-400">
                                We have partnerships with leading hospitals
                                across India, ensuring seamless transfers and
                                priority admission.
                            </p>
                        </motion.div>

                        <motion.div
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-red-500/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="w-14 h-14 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
                                <FaHandHoldingMedical className="text-red-500 text-2xl" />
                            </div>
                            <h4 className="text-lg font-bold mb-2 text-white">
                                Advanced Equipment
                            </h4>
                            <p className="text-gray-400">
                                Our ambulances are equipped with
                                state-of-the-art medical technology for
                                on-the-spot treatment and life support.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
