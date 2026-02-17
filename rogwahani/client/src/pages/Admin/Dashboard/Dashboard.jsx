import React from "react";
import { useState } from "react";
import {
    RiUserLine,
    RiGroupLine,
    RiFileTextLine,
    RiEyeLine,
    RiArrowUpLine,
    RiArrowDownLine,
    RiBarChartBoxLine,
    RiPieChartLine,
} from "react-icons/ri";

export default function Dashboard() {
    const stats = [
        {
            title: "Total Users",
            value: "24,850",
            icon: <RiUserLine />,
            change: "+12%",
            isIncrease: true,
        },
        {
            title: "Active Groups",
            value: "1,483",
            icon: <RiGroupLine />,
            change: "+5%",
            isIncrease: true,
        },
        {
            title: "Posts Today",
            value: "3,652",
            icon: <RiFileTextLine />,
            change: "-3%",
            isIncrease: false,
        },
        {
            title: "Daily Views",
            value: "42,691",
            icon: <RiEyeLine />,
            change: "+8%",
            isIncrease: true,
        },
    ];

    const recentActivities = [
        {
            user: "Sarah Johnson",
            action: "created a new post",
            time: "2 minutes ago",
            avatar: "/api/placeholder/32/32",
        },
        {
            user: "Mike Peterson",
            action: "joined Study Group",
            time: "5 minutes ago",
            avatar: "/api/placeholder/32/32",
        },
        {
            user: "Emily Davis",
            action: "reported a comment",
            time: "10 minutes ago",
            avatar: "/api/placeholder/32/32",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div className="text-red-400 text-2xl">
                                {stat.icon}
                            </div>
                            <div
                                className={`flex items-center ${
                                    stat.isIncrease
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {stat.isIncrease ? (
                                    <RiArrowUpLine />
                                ) : (
                                    <RiArrowDownLine />
                                )}
                                <span className="ml-1">{stat.change}</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-gray-400 text-sm">
                                {stat.title}
                            </h3>
                            <p className="text-2xl font-bold text-white">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts and Activities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Growth Chart */}
                <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">
                            User Growth
                        </h2>
                        <RiBarChartBoxLine className="text-red-400 text-xl" />
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        [User Growth Chart Placeholder]
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">
                            Recent Activities
                        </h2>
                        <button className="text-red-400 text-sm hover:text-red-300">
                            View All
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3"
                            >
                                <img
                                    src={activity.avatar}
                                    alt={activity.user}
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-300">
                                        <span className="font-medium text-white">
                                            {activity.user}
                                        </span>{" "}
                                        {activity.action}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Engagement Distribution */}
                <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">
                            Content Engagement
                        </h2>
                        <RiPieChartLine className="text-red-400 text-xl" />
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        [Engagement Chart Placeholder]
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h2 className="text-lg font-semibold text-white mb-4">
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            Create Announcement
                        </button>
                        <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                            View Reports
                        </button>
                        <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                            Manage Users
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
