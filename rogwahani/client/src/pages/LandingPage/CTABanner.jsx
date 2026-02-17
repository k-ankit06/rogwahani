import React from "react";
import { motion } from "framer-motion";
import { FaGooglePlay, FaAppStore } from "react-icons/fa";

const CTABanner = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="bg-grid-pattern w-full h-full"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <motion.div
                        className="mb-8 md:mb-0 md:mr-8"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Download Our Mobile App
                        </h2>
                        <p className="text-white/80 text-lg">
                            Get faster access to emergency services with our
                            mobile application. Book ambulances, track your
                            ride, and access medical history with just a few
                            taps.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <a
                            href="#"
                            className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-red-700 flex items-center justify-center"
                        >
                            <FaGooglePlay className="h-6 w-6 mr-2" />
                            Google Play
                        </a>
                        <a
                            href="#"
                            className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-red-700 flex items-center justify-center"
                        >
                            <FaAppStore className="h-6 w-6 mr-2" />
                            App Store
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
