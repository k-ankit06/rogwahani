import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BsPersonPlus,
    BsCheck2Circle,
    BsThreeDots,
    BsSearch,
    BsPersonCheck,
    BsPersonX,
    BsClock,
    BsPeople,
    BsArrowRight,
} from "react-icons/bs";

export default function Friends() {
    const [activeTab, setActiveTab] = useState("suggestions");
    const [searchQuery, setSearchQuery] = useState("");

    const tabs = [
        { id: "suggestions", label: "Suggestions", icon: BsPersonPlus },
        { id: "requests", label: "Requests", icon: BsClock, count: 5 },
        { id: "friends", label: "Friends", icon: BsPeople },
    ];

    // Sample data
    const suggestions = [
        {
            id: 1,
            name: "Alex Morgan",
            username: "@alex_m",
            mutualFriends: 12,
            avatar: "https://picsum.photos/seed/1/200",
            department: "Computer Science",
            isVerified: true,
        },
        // Add more suggestions...
    ];

    const requests = [
        {
            id: 1,
            name: "Emma Wilson",
            username: "@emma_w",
            timeAgo: "2d ago",
            avatar: "https://picsum.photos/seed/2/200",
            mutualFriends: 8,
        },
        // Add more requests...
    ];

    return (
        <div className="min-h-screen bg-gray-900 pb-20">
            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-16 bg-gray-900/95 backdrop-blur-md z-40 px-4 py-3 border-b border-gray-800"
            >
                <div className="relative max-w-[600px] mx-auto">
                    <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search friends..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="px-4 py-2 max-w-[600px] mx-auto">
                <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-2">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                                activeTab === tab.id
                                    ? "bg-purple-500 text-white"
                                    : "bg-gray-800 text-gray-300"
                            } whitespace-nowrap`}
                        >
                            <tab.icon className="text-lg" />
                            <span>{tab.label}</span>
                            {tab.count && (
                                <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full">
                                    {tab.count}
                                </span>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[600px] mx-auto px-4">
                <AnimatePresence mode="wait">
                    {activeTab === "suggestions" && (
                        <motion.div
                            key="suggestions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* Featured Suggestions */}
                            <div className="bg-gray-800/50 rounded-xl p-4">
                                <h3 className="text-white font-semibold mb-4">
                                    People you might know
                                </h3>
                                <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                                    {[1, 2, 3, 4].map((item) => (
                                        <motion.div
                                            key={item}
                                            whileHover={{ scale: 1.05 }}
                                            className="flex-shrink-0 w-48 bg-gray-800 rounded-xl p-4 border border-gray-700"
                                        >
                                            <div className="flex flex-col items-center text-center space-y-3">
                                                <div className="relative">
                                                    <img
                                                        src={`https://picsum.photos/seed/${item}/200`}
                                                        alt="Profile"
                                                        className="w-16 h-16 rounded-full object-cover"
                                                    />
                                                    {item % 2 === 0 && (
                                                        <BsCheck2Circle className="absolute bottom-0 right-0 text-purple-500 text-lg bg-gray-800 rounded-full" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">
                                                        John Doe {item}
                                                    </h4>
                                                    <p className="text-gray-400 text-sm">
                                                        @johndoe{item}
                                                    </p>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="bg-purple-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                                                >
                                                    Add Friend
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggestions List */}
                            <div className="space-y-4">
                                {suggestions.map((suggestion) => (
                                    <motion.div
                                        key={suggestion.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <img
                                                    src={suggestion.avatar}
                                                    alt={suggestion.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                {suggestion.isVerified && (
                                                    <BsCheck2Circle className="absolute bottom-0 right-0 text-purple-500 text-lg bg-gray-800 rounded-full" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium flex items-center gap-2">
                                                    {suggestion.name}
                                                    <span className="text-sm text-gray-400">
                                                        {suggestion.username}
                                                    </span>
                                                </h4>
                                                <p className="text-gray-400 text-sm">
                                                    {suggestion.mutualFriends}{" "}
                                                    mutual friends •{" "}
                                                    {suggestion.department}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-purple-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                                            >
                                                Add Friend
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1.5 text-gray-400 hover:text-white"
                                            >
                                                <BsThreeDots />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "requests" && (
                        <motion.div
                            key="requests"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            {requests.map((request) => (
                                <motion.div
                                    key={request.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-gray-800/50 rounded-xl p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={request.avatar}
                                                alt={request.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="text-white font-medium">
                                                    {request.name}
                                                </h4>
                                                <p className="text-gray-400 text-sm">
                                                    {request.mutualFriends}{" "}
                                                    mutual friends •{" "}
                                                    {request.timeAgo}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-purple-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                                            >
                                                <BsPersonCheck className="text-lg" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-gray-700 text-gray-300 px-4 py-1.5 rounded-lg text-sm font-medium"
                                            >
                                                <BsPersonX className="text-lg" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "friends" && (
                        <motion.div
                            key="friends"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* Friend Categories */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    "Recent",
                                    "Close Friends",
                                    "College",
                                    "Work",
                                ].map((category) => (
                                    <motion.div
                                        key={category}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-gray-800/50 rounded-xl p-4 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-white font-medium">
                                                {category}
                                            </h4>
                                            <BsArrowRight className="text-purple-400" />
                                        </div>
                                        <div className="flex -space-x-2 mt-3">
                                            {[1, 2, 3].map((i) => (
                                                <img
                                                    key={i}
                                                    src={`https://picsum.photos/seed/${category}${i}/200`}
                                                    alt=""
                                                    className="w-8 h-8 rounded-full border-2 border-gray-800"
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Friends List */}
                            <div className="bg-gray-800/50 rounded-xl p-4">
                                <h3 className="text-white font-semibold mb-4">
                                    All Friends
                                </h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((friend) => (
                                        <motion.div
                                            key={friend}
                                            whileHover={{
                                                backgroundColor:
                                                    "rgba(107, 114, 128, 0.3)",
                                            }}
                                            className="flex items-center justify-between p-2 rounded-lg"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={`https://picsum.photos/seed/friend${friend}/200`}
                                                    alt=""
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <h4 className="text-white font-medium">
                                                        Friend Name {friend}
                                                    </h4>
                                                    <p className="text-gray-400 text-sm">
                                                        Online now
                                                    </p>
                                                </div>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <BsThreeDots />
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
