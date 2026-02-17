// import { motion } from "framer-motion";
// import { FiUser, FiUserPlus } from "react-icons/fi";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import { setUser, logout } from "./../../store/slices/authSlice";
// import logo from "./../../assets/logo.png"

// export default function LandingPageNavbar({ handleLogin }) {
//     const dispatch = useDispatch();
//     const { user, token } = useSelector((state) => state.auth);

//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const handleLogout = () => {
//         dispatch(logout());
//     };
//     return (
//         <>
//             <nav className="fixed top-0 w-full z-50 transition-colors duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-auto py-4">
//                         <Link to="/"className="text-2xl font-bold">
//                         {/* <img src={logo} className="w-full h-[100px]"/> */}
//                     <span class="text-red-500">रोग</span><span class="text-white">वहिनी
//                     </span>
//                         </Link>
//                         <div className="hidden md:flex items-center space-x-8">

//                             {user ? (
//                                 <>
//                                     <p>Name: {user.name}</p>
//                                     <p>Email: {user.email}</p>
//                                     <p>Role: {user.role}</p>
//                                     <button onClick={handleLogout}>
//                                         Logout
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Link
//                                         to="/login"
//                                         className="inline-flex items-center text-white px-3 py-2 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
//                                     >
//                                         <FiUser className="mr-1" /> Login
//                                     </Link>

//                                     <Link
//                                         to="/signup"
//                                         className="inline-flex items-center text-white px-3 py-2 bg-red-600 border border-transparent rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
//                                     >
//                                         <FiUserPlus className="mr-1" /> Sign Up
//                                     </Link>
//                                 </>
//                             )}
//                         </div>

//                         {/* Mobile menu  */}
//                         <div className="md:hidden flex items-center space-x-4">
//                             <button
//                                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                                 className="text-gray-600 dark:text-gray-300"
//                             >
//                                 <svg
//                                     className="h-6 w-6"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d={
//                                             isMenuOpen
//                                                 ? "M6 18L18 6M6 6l12 12"
//                                                 : "M4 6h16M4 12h16M4 18h16"
//                                         }
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile menu */}
//                 {isMenuOpen && (
//                     <motion.div
//                         className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                     >
//                         <div className="px-4 pt-2 pb-3 space-y-2">
//                             {user ? (
//                                 <>
//                                     <p>Name: {user.name}</p>
//                                     <p>Email: {user.email}</p>
//                                     <button>Logout</button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Link
//                                         to="/login"
//                                         className=" w-full  flex justify-center items-center text-white px-3 py-2 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
//                                     >
//                                         <FiUser className="mr-1" /> Login
//                                     </Link>
//                                     <Link
//                                         to="/signup"
//                                         className=" w-full flex justify-center items-center text-white px-3 py-2 bg-red-600 border border-transparent rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
//                                     >
//                                         <FiUserPlus className="mr-1" /> Sign Up
//                                     </Link>
//                                 </>
//                             )}
//                         </div>
//                     </motion.div>
//                 )}
//             </nav>
//         </>
//     );
// }
import { motion } from "framer-motion";
import { FiUser, FiUserPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "./../../store/slices/authSlice";
import logo from "./../../assets/logo.png";

export default function LandingPageNavbar({ handleLogin }) {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Add scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
                        : "bg-transparent border-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-auto py-4">
                        <Link to="/" className="text-2xl font-bold">
                            {/* <img src={logo} className="w-full h-[100px]"/> */}
                            <span className="text-red-500">Rog</span>
                            <span
                                className={
                                    isScrolled
                                        ? "text-gray-900 dark:text-white"
                                        : "text-white"
                                }
                            >
                                Wahani
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            {user ? (
                                <>
                                    <p
                                        className={
                                            isScrolled
                                                ? "text-gray-900 dark:text-white"
                                                : "text-white"
                                        }
                                    >
                                        Name: {user.name}
                                    </p>
                                    <p
                                        className={
                                            isScrolled
                                                ? "text-gray-900 dark:text-white"
                                                : "text-white"
                                        }
                                    >
                                        Email: {user.email}
                                    </p>
                                    <p
                                        className={
                                            isScrolled
                                                ? "text-gray-900 dark:text-white"
                                                : "text-white"
                                        }
                                    >
                                        Role: {user.role}
                                    </p>
                                    <button
                                        onClick={handleLogout}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            isScrolled
                                                ? "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                                                : "text-white hover:bg-white/10"
                                        }`}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className={`inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                                            isScrolled
                                                ? "text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                : "text-white border-white/30 hover:bg-white/10"
                                        }`}
                                    >
                                        <FiUser className="mr-1" /> Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center text-white px-3 py-2 bg-red-600 border border-transparent rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                                    >
                                        <FiUserPlus className="mr-1" /> Sign Up
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-4">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={
                                    isScrolled
                                        ? "text-gray-600 dark:text-gray-300"
                                        : "text-white"
                                }
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={
                                            isMenuOpen
                                                ? "M6 18L18 6M6 6l12 12"
                                                : "M4 6h16M4 12h16M4 18h16"
                                        }
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="px-4 pt-2 pb-3 space-y-2">
                            {user ? (
                                <>
                                    <p className="text-gray-900 dark:text-white">
                                        Name: {user.name}
                                    </p>
                                    <p className="text-gray-900 dark:text-white">
                                        Email: {user.email}
                                    </p>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex justify-center items-center text-gray-900 dark:text-white px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="w-full flex justify-center items-center text-gray-900 dark:text-white px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <FiUser className="mr-1" /> Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="w-full flex justify-center items-center text-white px-3 py-2 bg-red-600 border border-transparent rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                                    >
                                        <FiUserPlus className="mr-1" /> Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </nav>
        </>
    );
}
