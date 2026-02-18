import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAmbulance, FaHeartbeat, FaHospital } from "react-icons/fa";
import { IoMdPulse } from "react-icons/io";
import { BsShieldCheck } from "react-icons/bs";
import logo from "../../assets/logo.png";

const SplashScreen = ({ onFinish }) => {
    const [phase, setPhase] = useState(0); // 0: heartbeat, 1: logo, 2: text, 3: fade out

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 800),
            setTimeout(() => setPhase(2), 1800),
            setTimeout(() => setPhase(3), 3200),
            setTimeout(() => onFinish(), 4000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [onFinish]);

    // Heartbeat line path
    const heartbeatPath =
        "M0,50 L30,50 L35,50 L40,20 L45,80 L50,10 L55,90 L60,30 L65,50 L100,50 L130,50 L135,50 L140,20 L145,80 L150,10 L155,90 L160,30 L165,50 L200,50";

    return (
        <AnimatePresence>
            {phase < 3 && (
                <motion.div
                    className="splash-screen"
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Background gradient layers */}
                    <div className="splash-bg-base" />
                    <div className="splash-bg-radial" />

                    {/* Animated grid lines */}
                    <div className="splash-grid" />

                    {/* Floating particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="splash-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                opacity: [0, 0.8, 0],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeInOut",
                            }}
                        />
                    ))}

                    {/* Pulsing rings behind logo */}
                    {phase >= 1 && (
                        <>
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={`ring-${i}`}
                                    className="splash-pulse-ring"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{
                                        scale: [0.5, 2.5 + i * 0.5],
                                        opacity: [0.6, 0],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        delay: i * 0.6,
                                        ease: "easeOut",
                                    }}
                                />
                            ))}
                        </>
                    )}

                    {/* Heartbeat line */}
                    <motion.div
                        className="splash-heartbeat-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase >= 0 ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg
                            viewBox="0 0 200 100"
                            className="splash-heartbeat-svg"
                            preserveAspectRatio="none"
                        >
                            <motion.path
                                d={heartbeatPath}
                                fill="none"
                                stroke="url(#heartbeatGradient)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: [0, 1],
                                    opacity: [0, 1],
                                }}
                                transition={{
                                    pathLength: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    },
                                    opacity: { duration: 0.3 },
                                }}
                            />
                            {/* Glow effect */}
                            <motion.path
                                d={heartbeatPath}
                                fill="none"
                                stroke="url(#heartbeatGradient)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: [0, 1],
                                    opacity: [0, 0.4],
                                }}
                                transition={{
                                    pathLength: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    },
                                    opacity: { duration: 0.3 },
                                }}
                            />
                            <defs>
                                <linearGradient
                                    id="heartbeatGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop offset="0%" stopColor="#dc2626" />
                                    <stop offset="50%" stopColor="#ef4444" />
                                    <stop
                                        offset="100%"
                                        stopColor="#dc2626"
                                    />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur
                                        stdDeviation="3"
                                        result="coloredBlur"
                                    />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                        </svg>
                    </motion.div>

                    {/* Center content */}
                    <div className="splash-center">
                        {/* Logo */}
                        <motion.div
                            className="splash-logo-wrapper"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={
                                phase >= 1
                                    ? { scale: 1, rotate: 0 }
                                    : { scale: 0, rotate: -180 }
                            }
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                duration: 0.8,
                            }}
                        >
                            <div className="splash-logo-glow" />
                            <div className="splash-logo-border">
                                <img
                                    src={logo}
                                    alt="RogWahani"
                                    className="splash-logo-img"
                                />
                            </div>
                        </motion.div>

                        {/* App name */}
                        <motion.div
                            className="splash-title-container"
                            initial={{ opacity: 0, y: 30 }}
                            animate={
                                phase >= 2
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 30 }
                            }
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h1 className="splash-title">
                                <span className="splash-title-rog">Rog</span>
                                <span className="splash-title-wahani">
                                    Wahani
                                </span>
                            </h1>
                            <motion.div
                                className="splash-title-underline"
                                initial={{ scaleX: 0 }}
                                animate={
                                    phase >= 2
                                        ? { scaleX: 1 }
                                        : { scaleX: 0 }
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: 0.3,
                                    ease: "easeOut",
                                }}
                            />
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            className="splash-tagline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                phase >= 2
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{
                                duration: 0.5,
                                delay: 0.4,
                                ease: "easeOut",
                            }}
                        >
                            Emergency Response at Your Fingertips
                        </motion.p>

                        {/* Feature icons */}
                        <motion.div
                            className="splash-features"
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                phase >= 2
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{
                                duration: 0.5,
                                delay: 0.6,
                                ease: "easeOut",
                            }}
                        >
                            {[
                                {
                                    icon: <FaAmbulance />,
                                    label: "Quick Dispatch",
                                },
                                { icon: <FaHeartbeat />, label: "Life Saving" },
                                { icon: <FaHospital />, label: "Hospital Link" },
                                { icon: <BsShieldCheck />, label: "Secure" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="splash-feature-item"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={
                                        phase >= 2
                                            ? { scale: 1, opacity: 1 }
                                            : { scale: 0, opacity: 0 }
                                    }
                                    transition={{
                                        delay: 0.7 + i * 0.12,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                >
                                    <div className="splash-feature-icon">
                                        {item.icon}
                                    </div>
                                    <span className="splash-feature-label">
                                        {item.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Loading bar at bottom */}
                    <motion.div
                        className="splash-loader-track"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="splash-loader-fill"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.2, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Corner decorations */}
                    <div className="splash-corner splash-corner-tl">+</div>
                    <div className="splash-corner splash-corner-tr">+</div>
                    <div className="splash-corner splash-corner-bl">+</div>
                    <div className="splash-corner splash-corner-br">+</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
