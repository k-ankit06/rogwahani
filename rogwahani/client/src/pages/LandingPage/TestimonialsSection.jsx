import React from "react";
import { motion } from "framer-motion";
import {
    FaAmbulance,
    FaUserMd,
    FaStar,
    FaQuoteLeft,
    FaHospital,
    FaHeartbeat,
} from "react-icons/fa";

const TestimonialsSection = () => {
    return (
        <section
            id="testimonials"
            className="py-20 bg-gradient-to-b from-gray-900 to-gray-950"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        className="inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="px-3 py-1 bg-red-600/10 text-red-500 rounded-full text-sm font-medium">
                            Testimonials
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        What Our Clients Say
                    </motion.h2>

                    <motion.p
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Read about how our emergency medical services have made
                        a difference in people's lives during critical moments.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <motion.div
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <FaQuoteLeft className="text-red-500/20 text-4xl absolute top-6 left-6" />
                        <div className="pt-8">
                            <div className="flex items-center mb-4">
                                <div className="flex mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className="text-yellow-500 mr-1"
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm">
                                    5.0
                                </span>
                            </div>
                            <p className="text-gray-300 mb-6">
                                "When my father suffered a sudden heart attack,
                                the Rogwahani team arrived within minutes. Their
                                quick response and professional care saved his
                                life. I cannot thank them enough."
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4">
                                    <img
                                        src=""
                                        className="object-cover rounded-full"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">
                                        Priya Sharma
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        Mumbai, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonial 2 */}
                    <motion.div
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <FaQuoteLeft className="text-red-500/20 text-4xl absolute top-6 left-6" />
                        <div className="pt-8">
                            <div className="flex items-center mb-4">
                                <div className="flex mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className="text-yellow-500 mr-1"
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm">
                                    5.0
                                </span>
                            </div>
                            <p className="text-gray-300 mb-6">
                                "I regularly use Rogwahani for my elderly
                                mother's hospital visits. Their non-emergency
                                transport service is reliable, and the staff is
                                always courteous and attentive to her needs."
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4">
                                    <img
                                        src=""
                                        className="object-cover rounded-full"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">
                                        Rajesh Patel
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        Delhi, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonial 3 */}
                    <motion.div
                        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <FaQuoteLeft className="text-red-500/20 text-4xl absolute top-6 left-6" />
                        <div className="pt-8">
                            <div className="flex items-center mb-4">
                                <div className="flex mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={
                                                i < 4
                                                    ? "text-yellow-500 mr-1"
                                                    : "text-gray-600 mr-1"
                                            }
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm">
                                    4.0
                                </span>
                            </div>
                            <p className="text-gray-300 mb-6">
                                "Our company arranged for the Rogwahani team to
                                conduct first responder training for our
                                employees. The training was comprehensive and
                                practical. It has given our team confidence in
                                handling emergency situations."
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4">
                                    <img
                                        src=""
                                        className="object-cover rounded-full"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">
                                        Anita Desai
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        HR Director, Tech Solutions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                    <motion.div
                        className="bg-gray-900/30 rounded-xl p-6 text-center border border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaAmbulance className="text-red-500 text-xl" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">
                            15,000+
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Emergency Responses
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900/30 rounded-xl p-6 text-center border border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaUserMd className="text-red-500 text-xl" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">
                            200+
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Medical Professionals
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900/30 rounded-xl p-6 text-center border border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaHospital className="text-red-500 text-xl" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">
                            50+
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Partner Hospitals
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900/30 rounded-xl p-6 text-center border border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaHeartbeat className="text-red-500 text-xl" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">
                            98.5%
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Satisfaction Rate
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
