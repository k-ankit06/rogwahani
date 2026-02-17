import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-gray-300 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-gray-800 rounded-2xl shadow-lg max-w-md"
            >
                <h1 className="text-4xl font-bold text-red-400">404</h1>
                <p className="mt-2 text-lg">
                    Oops! The page you’re looking for doesn’t exist.
                </p>

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-4"
                >
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 font-xl justify-center rounded-lg transition"
                    >
                        <BiHomeAlt className="text-xl" />
                        <span>Go Back Home</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
