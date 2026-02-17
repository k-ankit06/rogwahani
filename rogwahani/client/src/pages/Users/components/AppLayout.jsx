import { useState } from "react";
import { motion } from "framer-motion";
import {
    RiDashboardLine,
    RiUserLine,
    RiAccountBox2Fill,
    RiMapPinLine,
    RiSettings4Line,
    RiNotification3Line,
    RiMenu3Fill,
    RiArrowDownSLine,
    RiLogoutCircleRLine,
    RiUserSettingsLine,
    RiHistoryLine,
    RiPhoneLine,
    RiHeartPulseLine,
    RiHospitalLine,
    RiAccountBoxLine,
    RiEyeLine,
    Ri4kFill,
    RiRoadMapLine,
    RiStarLine,
} from "react-icons/ri";
import { BsChevronDown } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../../store/slices/authSlice";

export default function AppLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        window.location.reload();
    };

    const sidebarMenuItems = [
        {
            title: "Main",
            items: [
                {
                    name: "Dashboard",
                    icon: <RiDashboardLine />,
                    path: "/",
                },
                {
                    name: "Book Ambulance",
                    icon: <RiAccountBox2Fill />,
                    path: "/book-ambulance",
                },
            ],
        },
        {
            title: "Activity",
            items: [
                {
                    name: "Booking History",
                    icon: <RiHistoryLine />,
                    path: "/history",
                },
                {
                    name: "Track Ambulance",
                    icon: <RiRoadMapLine />,
                    path: "/track-ambulance",
                },
                {
                    name: "Nearby Hospitals",
                    icon: <RiHospitalLine />,
                    path: "/nearby-hospitals",
                },
                {
                    name: "Saved Locations",
                    icon: <RiMapPinLine />,
                    path: "/saved-locations",
                },
            ],
        },
        {
            title: "Support",
            items: [
                {
                    name: "Emergency Contacts",
                    icon: <RiPhoneLine />,
                    path: "/emergency-contacts",
                },
                {
                    name: "Rate & Review",
                    icon: <RiStarLine />,
                    path: "/reviews",
                },
                {
                    name: "Settings",
                    icon: <RiSettings4Line />,
                    path: "/profile",
                },
            ],
        },
    ];

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? "" : name);
    };

    // Animation variants
    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: "-100%" },
    };

    const contentVariants = {
        open: { marginLeft: "16rem" },
        closed: { marginLeft: 0 },
    };

    const dropdownVariants = {
        open: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.3 },
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Sidebar */}
            <motion.aside
                className="fixed top-0 left-0 z--40 w-64 h-screen bg-gray-800 border-r border-gray-700"
                initial="open"
                animate={isSidebarOpen ? "open" : "closed"}
                variants={sidebarVariants}
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <nav className="space-y-6 pt-16">
                        {sidebarMenuItems.map((section, idx) => (
                            <div key={idx} className="space-y-2">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
                                    {section.title}
                                </p>
                                {section.items.map((item, itemIdx) => (
                                    <div key={itemIdx}>
                                        <Link
                                            to={item.path}
                                            onClick={() =>
                                                item.children &&
                                                toggleDropdown(item.name)
                                            }
                                            className="flex items-center w-full p-2 text-base text-gray-300 rounded-lg hover:bg-gray-700 group"
                                        >
                                            <span className="text-red-500 text-xl">
                                                {item.icon}
                                            </span>
                                            <span className="ml-3 flex-1 text-left whitespace-nowrap">
                                                {item.name}
                                            </span>
                                            {item.children && (
                                                <BsChevronDown
                                                    className={`transition-transform ${
                                                        activeDropdown ===
                                                        item.name
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            )}
                                        </Link>
                                        {item.children && (
                                            <motion.div
                                                className="pl-11 space-y-1 overflow-hidden"
                                                initial="closed"
                                                animate={
                                                    activeDropdown === item.name
                                                        ? "open"
                                                        : "closed"
                                                }
                                                variants={dropdownVariants}
                                            >
                                                {item.children.map(
                                                    (child, childIdx) => (
                                                        <Link
                                                            key={childIdx}
                                                            to={child.path}
                                                            className="flex items-center justify-start w-full p-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700"
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    )
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Emergency Contact */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-r from-red-700 to-red-900 rounded-lg p-6 shadow-lg"
                        >
                            <h2 className="text-md font-semibold text-white mb-3">
                                24/7 Emergency Hotline
                            </h2>

                            <motion.a
                                href="tel:108"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-red-700 flex items-center justify-center py-2 rounded-lg font-semibold text-lg mt-2"
                            >
                                <RiPhoneLine className="mr-2" /> 108
                            </motion.a>
                        </motion.div>
                    </nav>
                </div>
            </motion.aside>

            {/* Navbar and Main Content */}
            <motion.div
                initial="open"
                animate={isSidebarOpen ? "open" : "closed"}
                variants={contentVariants}
                className="transition-all duration-300"
            >
                {/* Navbar */}
                <nav className="fixed top-0 right-0 z-30 w-full bg-gray-800 border-b border-gray-700 px-4 py-2.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex items-center p-2 w-64 order-2 sm:ml-4 lg:order-1">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center"
                                >
                                    <RiAccountBox2Fill className="text-red-500 text-2xl" />
                                    <span className="ml-3 text-xl font-bold text-white">
                                        Rog
                                        <span className="text-red-500">
                                            wahani
                                        </span>
                                    </span>
                                </motion.div>
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="text-gray-300 hover:text-white order-1 lg:order-2"
                            >
                                <RiMenu3Fill className="text-2xl" />
                            </button>
                        </div>

                        <div className="flex items-center space-x-6">
                            <motion.button
                                className="text-gray-300 hover:text-white relative"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <RiNotification3Line className="text-2xl" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                                    3
                                </span>
                            </motion.button>

                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setIsProfileOpen(!isProfileOpen)
                                    }
                                    className="flex items-center space-x-3 text-gray-300 hover:text-white"
                                >
                                    {user ? (
                                        <>
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <div className="hidden md:block text-left">
                                                <div className="text-sm font-medium">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {user.email}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    <RiArrowDownSLine
                                        className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-1 z-50"
                                    >
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                        >
                                            <RiUserSettingsLine className="mr-2" />{" "}
                                            Profile Settings
                                        </Link>
                                        <Link
                                            onClick={handleLogout}
                                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                        >
                                            <RiLogoutCircleRLine className="mr-2" />{" "}
                                            Logout
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="p-4 sm:p-6 lg:p-8 pt-20 min-h-screen bg-gray-900">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </motion.div>

            {/* Quick Action Button - Emergency */}
            <motion.button
                className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <RiAccountBoxLine className="text-2xl" />
                <span className="ml-2 hidden md:inline">Emergency</span>
            </motion.button>
        </div>
    );
}
