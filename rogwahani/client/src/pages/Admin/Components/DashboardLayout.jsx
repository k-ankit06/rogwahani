import { useState } from "react";
import {motion} from "framer-motion"
import {
    RiDashboardLine,
    RiUserLine,
    RiGroupLine,
    RiFileTextLine,
    RiSettings4Line,
    RiNotification3Line,
    RiMenu3Fill,
    RiArrowDownSLine,
    RiLogoutCircleRLine,
    RiUserSettingsLine,
    RiCompassDiscoverLine,
    RiCalendarEventLine,
    RiAccountBox2Fill,
    RiMessageLine,
    RiHashtag,
} from "react-icons/ri";
import { BsChevronDown } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "./../../../store/slices/authSlice";

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);

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
                    name: "Analytics",
                    icon: <RiCompassDiscoverLine />,
                    path: "/analytics",
                },
            ],
        },
        {
            title: "Community",
            items: [
                {
                    name: "User Management",
                    icon: <RiUserLine />,
                    children: [
                        { name: "All Users", path: "/all_users" },
                        {
                            name: "Verification Requests",
                            path: "/verification-requests",
                        },
                        { name: "Reports", path: "/user-reports" },
                    ],
                },
                {
                    name: "Groups",
                    icon: <RiGroupLine />,
                    children: [
                        { name: "All Groups", path: "/groups" },
                        { name: "Group Requests", path: "/group-requests" },
                    ],
                },
            ],
        },
        {
            title: "Major",
            items: [
                {
                    name: "Hospitals",
                    icon: <RiFileTextLine />,
                    path: "/hospitals",
                },
                {
                    name: "Events",
                    icon: <RiCalendarEventLine />,
                    path: "/events",
                },
                {
                    name: "Messages",
                    icon: <RiMessageLine />,
                    path: "/messages",
                },
                { name: "Hashtags", icon: <RiHashtag />, path: "/hashtags" },
            ],
        },
        {
            title: "Administration",
            items: [
                {
                    name: "Settings",
                    icon: <RiSettings4Line />,
                    path: "/settings",
                },
            ],
        },
    ];

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? "" : name);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z--40 w-64 h-screen transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } bg-gray-800 border-r border-gray-700`}
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
                                            <span className="text-red-400 text-xl">
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
                                        {item.children &&
                                            activeDropdown === item.name && (
                                                <div className="pl-11 space-y-1">
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
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Navbar and Main Content */}
            <div
                className={`${isSidebarOpen ? "ml-64" : "0"} transition-margin duration-300`}
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
                                        <span className="text-xs ml-1 bg-red-500 text-white px-2 py-0.5 rounded-lg">
                                            Admin
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
                            <button className="text-gray-300 hover:text-white relative">
                                <RiNotification3Line className="text-2xl" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                                    3
                                </span>
                            </button>

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
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-1">
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
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="p-8 pt-20 min-h-screen bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    );
}
