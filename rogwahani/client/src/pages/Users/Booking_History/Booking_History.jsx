import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    RiFileHistoryLine,
    RiRefreshLine,
    RiCalendarLine,
    RiMapPinLine,
    RiHospitalLine,
    RiArrowRightSLine,
    RiArrowDownSLine,
    RiEyeLine,
    RiPhoneLine,
    RiSearchLine,
    RiFilterLine,
    RiCloseLine,
    RiCheckLine,
    RiTimeLine,
    RiAlertLine,
    RiStarFill,
    RiStarLine,
    RiCalendarEventLine,
    RiFileWarningLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const BookingHistory = () => {
    const { user, token } = useSelector((state) => state.auth);
    // States
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedBookingId, setExpandedBookingId] = useState(null);
    const [showBookingDetails, setShowBookingDetails] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [cancelBookingId, setCancelBookingId] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const [isCancelling, setIsCancelling] = useState(false);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.2,
            },
        },
    };

    // Data fetching
    useEffect(() => {
        const fetchBookings = async () => {
            setIsLoading(true);
            try {
                // Get token from localStorage
                if (!token) {
                    throw new Error("Authorization token not found");
                }

                const response = await axios.get(
                    "http://localhost:5000/api/bookings",
                    {
                        headers: { "x-auth-token": token },
                    }
                );
                console.log(response.data);
                setBookings(response.data);
                setFilteredBookings(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // Apply filters
    useEffect(() => {
        let result = [...bookings];

        // Apply status filter
        if (activeFilter !== "all") {
            result = result.filter(
                (booking) => booking.status === activeFilter
            );
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (booking) =>
                    booking._id.toLowerCase().includes(query) ||
                    booking.locations.pickup.toLowerCase().includes(query) ||
                    booking.locations.dropoff.toLowerCase().includes(query) ||
                    (booking.patientInfo?.name &&
                        booking.patientInfo.name.toLowerCase().includes(query))
            );
        }

        // Apply date range filter
        if (dateRange.from && dateRange.to) {
            const fromDate = new Date(dateRange.from);
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999); // Include the end date fully

            result = result.filter((booking) => {
                const bookingDate = new Date(booking.dateTime.date);
                // console.log("bookingDate",booking)
                return bookingDate >= fromDate && bookingDate <= toDate;
            });
        }

        setFilteredBookings(result);
    }, [bookings, searchQuery, activeFilter, dateRange]);

    // Handle expand booking details
    const handleExpandBooking = (bookingId) => {
        setExpandedBookingId(
            expandedBookingId === bookingId ? null : bookingId
        );
    };

    // Handle view full booking details
    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
        setShowBookingDetails(true);
    };

    // Handle close booking details
    const handleCloseDetails = () => {
        setShowBookingDetails(false);
        setSelectedBooking(null);
    };

    // Handle open cancel modal
    const handleOpenCancelModal = (bookingId) => {
        setCancelBookingId(bookingId);
        setShowCancelModal(true);
    };

    // Handle close cancel modal
    const handleCloseCancelModal = () => {
        setShowCancelModal(false);
        setCancelBookingId(null);
        setCancelReason("");
    };

    // Handle cancel booking
    const handleCancelBooking = async () => {
        if (!cancelBookingId || !cancelReason) return;

        setIsCancelling(true);
        try {
            if (!token) {
                throw new Error("Authorization token not found");
            }

            await axios.post(
                `http://localhost:5000/api/bookings/${cancelBookingId}/cancel`,
                { reason: cancelReason },
                { headers: { "x-auth-token": token } }
            );

            // Update the local state
            const updatedBookings = bookings.map((booking) =>
                booking.bookingId === cancelBookingId
                    ? { ...booking, status: "cancelled" }
                    : booking
            );

            setBookings(updatedBookings);
            handleCloseCancelModal();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsCancelling(false);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get status badge
    const getStatusBadge = (status) => {
        let badgeClasses =
            "px-2 py-1 rounded-full text-xs font-medium flex items-center";
        let icon = null;

        switch (status) {
            case "completed":
                badgeClasses +=
                    " bg-green-900/40 text-green-400 border border-green-800";
                icon = <RiCheckLine className="mr-1" />;
                break;
            case "active":
                badgeClasses +=
                    " bg-blue-900/40 text-blue-400 border border-blue-800";
                icon = <RiTimeLine className="mr-1" />;
                break;
            case "upcoming":
                badgeClasses +=
                    " bg-red-900/40 text-red-400 border border-red-800";
                icon = <RiCalendarEventLine className="mr-1" />;
                break;
            case "cancelled":
                badgeClasses +=
                    " bg-gray-900/40 text-gray-400 border border-gray-800";
                icon = <RiCloseLine className="mr-1" />;
                break;
            default:
                badgeClasses +=
                    " bg-yellow-900/40 text-yellow-400 border border-yellow-800";
                icon = <RiAlertLine className="mr-1" />;
        }

        return (
            <span className={badgeClasses}>
                {icon}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // Render rating section (conditionally)
    const renderRatingSection = (booking) => {
        if (booking.status === "completed" && booking.rating) {
            return (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-xs mb-2">Your Rating</p>
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>
                                {star <= booking.rating ? (
                                    <RiStarFill className="text-red-500 mr-1" />
                                ) : (
                                    <RiStarLine className="text-gray-600 mr-1" />
                                )}
                            </span>
                        ))}
                        <span className="ml-2 text-white text-sm">
                            {booking.rating}/5
                        </span>
                    </div>
                    {booking.review && (
                        <p className="text-gray-300 text-sm mt-2 italic">
                            "{booking.review}"
                        </p>
                    )}
                </div>
            );
        } else if (booking.status === "completed" && !booking.rating) {
            return (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded flex items-center">
                        <RiStarLine className="mr-1" />
                        Rate this trip
                    </button>
                </div>
            );
        }
        return null;
    };

    // Render filter tabs
    const renderFilterTabs = () => {
        const filters = [
            { id: "all", label: "All" },
            { id: "upcoming", label: "Upcoming" },
            { id: "active", label: "Active" },
            { id: "completed", label: "Completed" },
            { id: "cancelled", label: "Cancelled" },
        ];

        return (
            <div className="flex overflow-x-auto pb-2 mb-4 hide-scrollbar">
                <div className="flex space-x-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                                activeFilter === filter.id
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            }`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    // Render booking cards
    const renderBookingCards = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col space-y-4">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            variants={itemVariants}
                            className="bg-gray-800 border border-gray-700 rounded-lg p-4 animate-pulse"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <div className="h-4 bg-gray-700 rounded w-24"></div>
                                <div className="h-4 bg-gray-700 rounded w-20"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            );
        }

        if (filteredBookings.length === 0) {
            return (
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center justify-center bg-gray-800/50 border border-gray-700/50 rounded-lg p-8 text-center"
                >
                    <RiFileHistoryLine className="text-4xl text-gray-600 mb-3" />
                    <h3 className="text-lg font-medium text-gray-300">
                        No bookings found
                    </h3>
                    <p className="text-gray-500 max-w-sm mt-1">
                        {searchQuery ||
                        activeFilter !== "all" ||
                        (dateRange.from && dateRange.to)
                            ? "No bookings match your search criteria. Try adjusting your filters or search query."
                            : "You don't have any bookings yet."}
                    </p>
                    {(searchQuery ||
                        activeFilter !== "all" ||
                        (dateRange.from && dateRange.to)) && (
                        <button
                            className="mt-4 flex items-center text-red-500 hover:text-red-400"
                            onClick={() => {
                                setSearchQuery("");
                                setActiveFilter("all");
                                setDateRange({ from: "", to: "" });
                            }}
                        >
                            <RiRefreshLine className="mr-1" />
                            Reset Filters
                        </button>
                    )}
                </motion.div>
            );
        }

        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col space-y-4"
            >
                {filteredBookings.map((booking) => (
                    <motion.div
                        key={booking._id || booking.bookingId}
                        variants={itemVariants}
                        className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
                    >
                        <div className="p-4">
                            <div className="flex flex-wrap justify-between items-center mb-3">
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <span className="text-gray-400 text-xs mr-2">
                                        ID:
                                    </span>
                                    <span className="text-white font-medium">
                                        {booking._id || booking.bookingId}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    {getStatusBadge(booking.status)}
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="flex items-start">
                                    <RiCalendarLine className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-sm">
                                            {formatDate(booking.dateTime.date)}{" "}
                                            • {booking.dateTime.time}
                                        </p>
                                        <p className="text-gray-400 text-xs">
                                            Est. duration:{" "}
                                            {booking.estimatedDuration
                                                ? booking.estimatedDuration
                                                : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="flex">
                                    <div className="flex flex-col items-center mr-2">
                                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                            <RiMapPinLine className="text-white text-xs" />
                                        </div>
                                        <div className="w-0.5 h-6 bg-gray-600 my-1"></div>
                                        <div className="w-6 h-6 rounded-full bg-red-700 flex items-center justify-center">
                                            <RiHospitalLine className="text-white text-xs" />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="mb-2">
                                            <p className="text-gray-400 text-xs">
                                                Pickup
                                            </p>
                                            <p className="text-white text-sm truncate">
                                                {booking.locations.pickup}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">
                                                Dropoff
                                            </p>
                                            <p className="text-white text-sm truncate">
                                                {booking.locations.dropoff}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {expandedBookingId ===
                                (booking._id || booking.bookingId) && (
                                <div className="pt-3 mt-3 border-t border-gray-700">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">
                                                Patient
                                            </p>
                                            <p className="text-white text-sm">
                                                {booking.patientInfo?.name ||
                                                    booking.patient?.name ||
                                                    "N/A"}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                {booking.patientInfo?.age ||
                                                    booking.patient?.age ||
                                                    "N/A"}{" "}
                                                years •
                                                {booking.patientInfo?.gender ||
                                                booking.patient?.gender
                                                    ? ` ${
                                                          (
                                                              booking
                                                                  .patientInfo
                                                                  ?.gender ||
                                                              booking.patient
                                                                  ?.gender
                                                          )
                                                              .charAt(0)
                                                              .toUpperCase() +
                                                          (
                                                              booking
                                                                  .patientInfo
                                                                  ?.gender ||
                                                              booking.patient
                                                                  ?.gender
                                                          ).slice(1)
                                                      }`
                                                    : " N/A"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">
                                                Medical Condition
                                            </p>
                                            <p className="text-white text-sm">
                                                {booking.patient
                                                    ?.medicalCondition ||
                                                    booking.medicalCondition ||
                                                    "N/A"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">
                                                Ambulance Type
                                            </p>
                                            <p className="text-white text-sm">
                                                {booking.ambulanceType ||
                                                    "Standard"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">
                                                Payment
                                            </p>
                                            <p className="text-white text-sm">
                                                {booking.fare || "N/A"} •{" "}
                                                {booking.paymentMethod || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    {renderRatingSection(booking)}
                                </div>
                            )}

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    className="text-gray-400 hover:text-white text-sm flex items-center"
                                    onClick={() =>
                                        handleExpandBooking(
                                            booking._id || booking.bookingId
                                        )
                                    }
                                >
                                    {expandedBookingId ===
                                    (booking._id || booking.bookingId) ? (
                                        <>
                                            <RiArrowDownSLine className="mr-1" />
                                            Show less
                                        </>
                                    ) : (
                                        <>
                                            <RiArrowRightSLine className="mr-1" />
                                            Show more
                                        </>
                                    )}
                                </button>

                                <div className="flex space-x-2">
                                    {booking.status === "active" && (
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded flex items-center">
                                            <RiPhoneLine className="mr-1" />
                                            Contact
                                        </button>
                                    )}

                                    {booking.status === "upcoming" ||
                                        (booking.status === "pending" && (
                                            <>
                                                <button
                                                    className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm py-1 px-3 rounded"
                                                    onClick={() =>
                                                        handleOpenCancelModal(
                                                            booking._id ||
                                                                booking.bookingId
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button className="bg-red-700 hover:bg-red-800 text-white text-sm py-1 px-3 rounded">
                                                    Reschedule
                                                </button>
                                            </>
                                        ))}

                                    <button
                                        className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded flex items-center"
                                        onClick={() =>
                                            handleViewDetails(booking)
                                        }
                                    >
                                        <RiEyeLine className="mr-1" />
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    // Render the booking details modal
    const renderBookingDetailsModal = () => {
        if (!showBookingDetails || !selectedBooking) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
                <motion.div
                    className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
                        <h3 className="text-lg font-medium text-white">
                            Booking Details
                        </h3>
                        <button
                            className="text-gray-400 hover:text-white"
                            onClick={handleCloseDetails}
                        >
                            <RiCloseLine size={24} />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="flex items-center mb-1">
                                    <span className="text-gray-400 text-sm mr-2">
                                        Booking ID:
                                    </span>
                                    <span className="text-white font-medium">
                                        {selectedBooking._id ||
                                            selectedBooking.bookingId}
                                    </span>
                                </div>
                                <div className="text-gray-400 text-sm">
                                    {formatDate(selectedBooking.dateTime.date)}{" "}
                                    • {selectedBooking.dateTime.time}
                                </div>
                            </div>
                            {getStatusBadge(selectedBooking.status)}
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4 mb-6">
                            <h4 className="text-white text-sm font-medium mb-3">
                                Journey Details
                            </h4>
                            <div className="flex mb-5">
                                <div className="flex flex-col items-center mr-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                                        <RiMapPinLine className="text-white" />
                                    </div>
                                    <div className="w-0.5 h-12 bg-gray-600 my-1"></div>
                                    <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center">
                                        <RiHospitalLine className="text-white" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="mb-4">
                                        <p className="text-gray-400 text-xs">
                                            Pickup Location
                                        </p>
                                        <p className="text-white">
                                            {selectedBooking.locations.pickup}
                                        </p>
                                    </div>
                                    <div className="mt-10">
                                        <p className="text-gray-400 text-xs">
                                            Dropoff Location
                                        </p>
                                        <p className="text-white">
                                            {selectedBooking.locations.dropoff}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-400 text-xs">
                                        Estimated Duration
                                    </p>
                                    <p className="text-white">
                                        {selectedBooking.estimatedDuration ||
                                            "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">
                                        Estimated Distance
                                    </p>
                                    <p className="text-white">
                                        {selectedBooking.estimatedDistance ||
                                            "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-gray-800 rounded-lg p-4">
                                <h4 className="text-white text-sm font-medium mb-3">
                                    Patient Information
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-gray-400 text-xs">
                                            Name
                                        </p>
                                        <p className="text-white">
                                            {selectedBooking.patientInfo
                                                ?.name ||
                                                selectedBooking.patient?.name ||
                                                "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">
                                            Age & Gender
                                        </p>
                                        <p className="text-white">
                                            {selectedBooking.patientInfo?.age ||
                                                selectedBooking.patient?.age ||
                                                "N/A"}{" "}
                                            years •
                                            {selectedBooking.patientInfo
                                                ?.gender ||
                                            selectedBooking.patient?.gender
                                                ? ` ${
                                                      (
                                                          selectedBooking
                                                              .patientInfo
                                                              ?.gender ||
                                                          selectedBooking
                                                              .patient?.gender
                                                      )
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      (
                                                          selectedBooking
                                                              .patientInfo
                                                              ?.gender ||
                                                          selectedBooking
                                                              .patient?.gender
                                                      ).slice(1)
                                                  }`
                                                : " N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">
                                            Medical Condition
                                        </p>
                                        <p className="text-white">
                                            {selectedBooking.patient
                                                ?.medicalCondition ||
                                                selectedBooking.medicalCondition ||
                                                "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-4">
                                <h4 className="text-white text-sm font-medium mb-3">
                                    Booking Information
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-gray-400 text-xs">
                                            Ambulance Type
                                        </p>
                                        <p className="text-white">
                                            {selectedBooking.ambulanceType ||
                                                "Standard"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">
                                            Payment Method
                                        </p>
                                        <p className="text-white">
                                            {selectedBooking.paymentMethod ||
                                                "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">
                                            Fare
                                        </p>
                                        <p className="text-white">
                                            {selectedBooking.fare || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedBooking.status === "completed" &&
                            selectedBooking.rating && (
                                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                                    <h4 className="text-white text-sm font-medium mb-3">
                                        Your Rating
                                    </h4>
                                    <div className="flex items-center mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star}>
                                                {star <=
                                                selectedBooking.rating ? (
                                                    <RiStarFill
                                                        className="text-red-500 mr-1"
                                                        size={20}
                                                    />
                                                ) : (
                                                    <RiStarLine
                                                        className="text-gray-600 mr-1"
                                                        size={20}
                                                    />
                                                )}
                                            </span>
                                        ))}
                                        <span className="ml-2 text-white">
                                            {selectedBooking.rating}/5
                                        </span>
                                    </div>
                                    {selectedBooking.review && (
                                        <div>
                                            <p className="text-gray-400 text-xs mb-1">
                                                Your Review
                                            </p>
                                            <p className="text-white italic">
                                                "{selectedBooking.review}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                        {selectedBooking.status === "cancelled" && (
                            <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 mb-6">
                                <div className="flex items-start">
                                    <RiFileWarningLine
                                        className="text-red-500 mt-0.5 mr-2 flex-shrink-0"
                                        size={20}
                                    />
                                    <div>
                                        <h4 className="text-white text-sm font-medium mb-1">
                                            Cancellation Information
                                        </h4>
                                        <p className="text-gray-300 text-sm">
                                            {selectedBooking.cancellationReason ||
                                                "This booking was cancelled."}
                                        </p>
                                        {selectedBooking.cancelledAt && (
                                            <p className="text-gray-400 text-xs mt-1">
                                                Cancelled on{" "}
                                                {new Date(
                                                    selectedBooking.cancelledAt
                                                ).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end space-x-3">
                            {(selectedBooking.status === "upcoming") |
                                (selectedBooking.status === "pending") && (
                                <>
                                    <button
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                                        onClick={() => {
                                            handleCloseDetails();
                                            handleOpenCancelModal(
                                                selectedBooking._id ||
                                                    selectedBooking.bookingId
                                            );
                                        }}
                                    >
                                        Cancel Booking
                                    </button>
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                                        Reschedule
                                    </button>
                                </>
                            )}
                            <button
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={handleCloseDetails}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

    // Render the cancel booking modal
    const renderCancelBookingModal = () => {
        if (!showCancelModal) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
                <motion.div
                    className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-md"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="p-4 border-b border-gray-700 flex items-center">
                        <RiFileWarningLine
                            className="text-red-500 mr-2"
                            size={20}
                        />
                        <h3 className="text-lg font-medium text-white">
                            Cancel Booking
                        </h3>
                    </div>

                    <div className="p-6">
                        <p className="text-gray-300 mb-4">
                            Are you sure you want to cancel this booking? This
                            action cannot be undone.
                        </p>

                        <div className="mb-4">
                            <label
                                className="block text-gray-400 text-sm mb-2"
                                htmlFor="cancelReason"
                            >
                                Reason for cancellation
                            </label>
                            <textarea
                                id="cancelReason"
                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                rows="3"
                                placeholder="Please provide a reason for cancellation"
                                value={cancelReason}
                                onChange={(e) =>
                                    setCancelReason(e.target.value)
                                }
                            ></textarea>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={handleCloseCancelModal}
                                disabled={isCancelling}
                            >
                                No, Keep Booking
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center"
                                onClick={handleCancelBooking}
                                disabled={isCancelling || !cancelReason.trim()}
                            >
                                {isCancelling ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Yes, Cancel Booking"
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

    // Render filter menu
    const renderFilterMenu = () => {
        if (!showFilterMenu) return null;

        return (
            <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 bg-black/70 p-4">
                <motion.div
                    className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-md max-h-[80vh] overflow-auto"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
                        <h3 className="text-lg font-medium text-white">
                            Filter Bookings
                        </h3>
                        <button
                            className="text-gray-400 hover:text-white"
                            onClick={() => setShowFilterMenu(false)}
                        >
                            <RiCloseLine size={24} />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <h4 className="text-white text-sm font-medium mb-3">
                                Booking Status
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    "all",
                                    "upcoming",
                                    "active",
                                    "completed",
                                    "cancelled",
                                ].map((status) => (
                                    <button
                                        key={status}
                                        className={`px-4 py-2 rounded text-sm border ${
                                            activeFilter === status
                                                ? "bg-red-600 border-red-600 text-white"
                                                : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700"
                                        }`}
                                        onClick={() => setActiveFilter(status)}
                                    >
                                        {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-white text-sm font-medium mb-3">
                                Date Range
                            </h4>
                            <div className="space-y-3">
                                <div>
                                    <label
                                        className="block text-gray-400 text-xs mb-1"
                                        htmlFor="dateFrom"
                                    >
                                        From
                                    </label>
                                    <input
                                        id="dateFrom"
                                        type="date"
                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                        value={dateRange.from}
                                        onChange={(e) =>
                                            setDateRange((prev) => ({
                                                ...prev,
                                                from: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-gray-400 text-xs mb-1"
                                        htmlFor="dateTo"
                                    >
                                        To
                                    </label>
                                    <input
                                        id="dateTo"
                                        type="date"
                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                                        value={dateRange.to}
                                        onChange={(e) =>
                                            setDateRange((prev) => ({
                                                ...prev,
                                                to: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between pt-4 border-t border-gray-700">
                            <button
                                className="text-gray-400 hover:text-white flex items-center"
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveFilter("all");
                                    setDateRange({ from: "", to: "" });
                                }}
                            >
                                <RiRefreshLine className="mr-1" />
                                Reset all
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                onClick={() => setShowFilterMenu(false)}
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

    // Handle error display
    const renderError = () => {
        if (!error) return null;

        return (
            <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded mb-6 flex items-start">
                <RiAlertLine className="flex-shrink-0 mt-0.5 mr-2" />
                <div>
                    <p className="font-medium">Error loading bookings</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    };

    // Main return
    return (
        <div className="min-h-screen bg-gray-900 pt-8 text-white">
            {/* Header */}
            <div className="border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">
                            Booking History
                        </h1>
                        <Link
                            to="/book-ambulance"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                        >
                            <span className="mr-1">+</span> New Booking
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                {renderError()}

                {/* Search and filter section */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-red-500"
                                placeholder="Search by ID, location or patient name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg flex items-center"
                            onClick={() => setShowFilterMenu(true)}
                        >
                            <RiFilterLine className="mr-2" />
                            Filter
                            {(activeFilter !== "all" ||
                                (dateRange.from && dateRange.to)) && (
                                <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                                    {(activeFilter !== "all" ? 1 : 0) +
                                        (dateRange.from && dateRange.to
                                            ? 1
                                            : 0)}
                                </span>
                            )}
                        </button>
                    </div>

                    {renderFilterTabs()}
                </div>

                {/* Booking list */}
                {renderBookingCards()}
            </div>

            {/* Modals */}
            {renderBookingDetailsModal()}
            {renderCancelBookingModal()}
            {renderFilterMenu()}

            {/* Fixed buttons for mobile */}
            <div className="fixed bottom-6 right-6 md:hidden">
                <button className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">+</span>
                </button>
            </div>
        </div>
    );
};

export default BookingHistory;
