import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
    RiStarFill,
    RiStarLine,
    RiTimeLine,
    RiMapPinLine,
    RiCalendarLine,
    RiUserLine,
    RiThumbUpLine,
    RiThumbDownLine,
    RiSearchLine,
    RiInformationLine,
    RiFilterLine,
    RiEditLine,
    RiArrowLeftLine,
    RiCloseLine,
    RiSendPlane2Line,
    Ri24HoursFill,
} from "react-icons/ri";

const RateAndReview = () => {
    const { user } = useSelector((state) => state.auth);
    const [rides, setRides] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("recent");
    const [isReviewing, setIsReviewing] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);
    const [reviewData, setReviewData] = useState({
        rating: 0,
        comment: "",
        driverRating: 0,
        vehicleRating: 0,
        responseTimeRating: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Sample data
    const sampleRides = [
        {
            id: 1,
            date: "2023-09-28T14:30:00Z",
            pickup: "Home, 123 Residential Complex",
            destination: "City Hospital, Medical Avenue",
            driverName: "Rajesh Kumar",
            vehicleId: "MH-01-AB-1234",
            fare: 850,
            duration: "28 min",
            distance: "12.4 km",
            status: "completed",
            reviewed: true,
            rating: 4,
            review: "Driver was very professional and responsive. The ambulance was clean and well-equipped.",
            driverRating: 5,
            vehicleRating: 4,
            responseTimeRating: 4,
        },
        {
            id: 2,
            date: "2023-10-15T09:45:00Z",
            pickup: "Office, Tech Park Building C",
            destination: "Apex Medical Center, Gandhi Road",
            driverName: "Sanjay Verma",
            vehicleId: "MH-02-CD-5678",
            fare: 950,
            duration: "35 min",
            distance: "15.1 km",
            status: "completed",
            reviewed: true,
            rating: 3,
            review: "Service was okay. Driver took a longer route than necessary.",
            driverRating: 3,
            vehicleRating: 4,
            responseTimeRating: 2,
        },
        {
            id: 3,
            date: "2023-11-02T18:15:00Z",
            pickup: "Parents' Home, Green Valley Apartments",
            destination: "City Hospital, Medical Avenue",
            driverName: "Amit Patel",
            vehicleId: "MH-03-EF-9012",
            fare: 750,
            duration: "22 min",
            distance: "9.8 km",
            status: "completed",
            reviewed: false,
            rating: null,
            review: null,
            driverRating: null,
            vehicleRating: null,
            responseTimeRating: null,
        },
        {
            id: 4,
            date: "2023-11-20T11:30:00Z",
            pickup: "Home, 123 Residential Complex",
            destination: "Life Care Hospital, Park Street",
            driverName: "Vikram Singh",
            vehicleId: "MH-04-GH-3456",
            fare: 1050,
            duration: "40 min",
            distance: "18.3 km",
            status: "completed",
            reviewed: false,
            rating: null,
            review: null,
            driverRating: null,
            vehicleRating: null,
            responseTimeRating: null,
        },
        {
            id: 5,
            date: "2023-12-05T08:00:00Z",
            pickup: "Gym, FitLife Center",
            destination: "Orthopedic Specialty Clinic, Hospital Road",
            driverName: "Pradeep Sharma",
            vehicleId: "MH-05-IJ-7890",
            fare: 650,
            duration: "18 min",
            distance: "7.5 km",
            status: "cancelled",
            reviewed: false,
            rating: null,
            review: null,
            driverRating: null,
            vehicleRating: null,
            responseTimeRating: null,
        },
    ];

    useEffect(() => {
        // Simulate loading data from API
        setTimeout(() => {
            setRides(sampleRides);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (value) => {
        setFilter(value);
        setShowFilters(false);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setShowFilters(false);
    };

    // Filter and sort rides
    const filteredRides = rides
        .filter((ride) => {
            // Filter by search term
            const matchesSearch =
                ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ride.destination
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                ride.driverName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            // Filter by status
            if (filter === "reviewed") {
                return matchesSearch && ride.reviewed;
            } else if (filter === "pending") {
                return (
                    matchesSearch &&
                    !ride.reviewed &&
                    ride.status === "completed"
                );
            } else if (filter === "all") {
                return matchesSearch && ride.status === "completed";
            }
            return matchesSearch;
        })
        .sort((a, b) => {
            // Sort by selected criteria
            if (sortBy === "recent") {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === "oldest") {
                return new Date(a.date) - new Date(b.date);
            } else if (sortBy === "highest") {
                if (a.rating === null) return 1;
                if (b.rating === null) return -1;
                return b.rating - a.rating;
            } else if (sortBy === "lowest") {
                if (a.rating === null) return 1;
                if (b.rating === null) return -1;
                return a.rating - b.rating;
            }
            return 0;
        });

    const handleRateRide = (ride) => {
        setSelectedRide(ride);
        setReviewData({
            rating: ride.rating || 0,
            comment: ride.review || "",
            driverRating: ride.driverRating || 0,
            vehicleRating: ride.vehicleRating || 0,
            responseTimeRating: ride.responseTimeRating || 0,
        });
        setIsReviewing(true);
    };

    const handleRatingChange = (field, value) => {
        setReviewData({
            ...reviewData,
            [field]: value,
        });
    };

    const handleCommentChange = (e) => {
        setReviewData({
            ...reviewData,
            comment: e.target.value,
        });
    };

    const handleSubmitReview = () => {
        // Update the ride with review data
        const updatedRides = rides.map((ride) =>
            ride.id === selectedRide.id
                ? {
                      ...ride,
                      reviewed: true,
                      rating: reviewData.rating,
                      review: reviewData.comment,
                      driverRating: reviewData.driverRating,
                      vehicleRating: reviewData.vehicleRating,
                      responseTimeRating: reviewData.responseTimeRating,
                  }
                : ride
        );
        setRides(updatedRides);
        setIsReviewing(false);
        setSelectedRide(null);
    };

    // Star rating component
    const StarRating = ({
        rating,
        onRatingChange,
        field,
        size = "text-xl",
    }) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`${size} ${
                            star <= rating ? "text-yellow-400" : "text-gray-500"
                        }`}
                        onClick={() => onRatingChange(field, star)}
                    >
                        {star <= rating ? <RiStarFill /> : <RiStarLine />}
                    </button>
                ))}
            </div>
        );
    };

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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    const renderReviewModal = () => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <div className="bg-gray-800 rounded-lg w-full max-w-lg">
                    <div className="p-5 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">
                                {selectedRide?.reviewed
                                    ? "Edit Your Review"
                                    : "Rate Your Ride"}
                            </h3>
                            <button
                                onClick={() => {
                                    setIsReviewing(false);
                                    setSelectedRide(null);
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                <RiCloseLine className="text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="p-4 bg-gray-700/50 rounded-lg mb-5">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-sm text-gray-400">
                                    <RiCalendarLine className="inline mr-1" />
                                    {new Date(
                                        selectedRide?.date
                                    ).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-gray-400">
                                    <RiTimeLine className="inline mr-1" />
                                    {selectedRide?.duration}
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="flex items-center">
                                    <RiMapPinLine className="text-red-500 mr-2" />
                                    <div>
                                        <div className="text-gray-300 text-sm">
                                            From
                                        </div>
                                        <div className="text-white">
                                            {selectedRide?.pickup}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <RiMapPinLine className="text-green-500 mr-2" />
                                    <div>
                                        <div className="text-gray-300 text-sm">
                                            To
                                        </div>
                                        <div className="text-white">
                                            {selectedRide?.destination}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="text-center">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Overall Rating
                                </label>
                                <StarRating
                                    rating={reviewData.rating}
                                    onRatingChange={handleRatingChange}
                                    field="rating"
                                    size="text-3xl"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Driver
                                    </label>
                                    <StarRating
                                        rating={reviewData.driverRating}
                                        onRatingChange={handleRatingChange}
                                        field="driverRating"
                                    />
                                </div>
                                <div className="text-center">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Vehicle
                                    </label>
                                    <StarRating
                                        rating={reviewData.vehicleRating}
                                        onRatingChange={handleRatingChange}
                                        field="vehicleRating"
                                    />
                                </div>
                                <div className="text-center">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Response Time
                                    </label>
                                    <StarRating
                                        rating={reviewData.responseTimeRating}
                                        onRatingChange={handleRatingChange}
                                        field="responseTimeRating"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Additional Comments
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Share your experience..."
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={reviewData.comment}
                                    onChange={handleCommentChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border-t border-gray-700 flex justify-end">
                        <button
                            onClick={handleSubmitReview}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                            disabled={reviewData.rating === 0}
                        >
                            <RiSendPlane2Line className="mr-1" />
                            {selectedRide?.reviewed
                                ? "Update Review"
                                : "Submit Review"}
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    };

    const renderFiltersModal = () => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <div className="bg-gray-800 rounded-lg w-full max-w-md">
                    <div className="p-5 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">
                                Filter & Sort
                            </h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <RiCloseLine className="text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="p-5 space-y-6">
                        <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-3">
                                Filter By Status
                            </h4>
                            <div className="space-y-2">
                                {[
                                    {
                                        value: "all",
                                        label: "All Completed Rides",
                                    },
                                    {
                                        value: "reviewed",
                                        label: "Reviewed Rides",
                                    },
                                    {
                                        value: "pending",
                                        label: "Pending Reviews",
                                    },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() =>
                                            handleFilterChange(option.value)
                                        }
                                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                                            filter === option.value
                                                ? "bg-red-600/20 border border-red-600/30"
                                                : "bg-gray-700 border border-gray-600"
                                        }`}
                                    >
                                        <span>{option.label}</span>
                                        {filter === option.value && (
                                            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-3">
                                Sort By
                            </h4>
                            <div className="space-y-2">
                                {[
                                    { value: "recent", label: "Most Recent" },
                                    { value: "oldest", label: "Oldest First" },
                                    {
                                        value: "highest",
                                        label: "Highest Rating",
                                    },
                                    { value: "lowest", label: "Lowest Rating" },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() =>
                                            handleSortChange(option.value)
                                        }
                                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                                            sortBy === option.value
                                                ? "bg-red-600/20 border border-red-600/30"
                                                : "bg-gray-700 border border-gray-600"
                                        }`}
                                    >
                                        <span>{option.label}</span>
                                        {sortBy === option.value && (
                                            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border-t border-gray-700 flex justify-end">
                        <button
                            onClick={() => setShowFilters(false)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="bg-gray-900 text-white p-4 md:p-8 min-h-screen">
            <div className="pt-6 mx-auto">
                <div className="flex items-center mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Rate & Review
                        </h1>
                        <p className="text-gray-400">
                            Share your feedback about your ambulance rides
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <RiSearchLine className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search your rides..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(true)}
                        className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center whitespace-nowrap"
                    >
                        <RiFilterLine className="mr-2" />
                        Filter & Sort
                    </button>
                </div>

                {isLoading ? (
                    <div className="py-20 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : rides.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-800 rounded-lg p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Ri24HoursFill className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">
                            No ride history yet
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Your completed ambulance rides will appear here for
                            you to review
                        </p>
                    </motion.div>
                ) : filteredRides.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <h3 className="text-xl font-medium text-white mb-2">
                            No results found
                        </h3>
                        <p className="text-gray-400">
                            No rides match your current filters or search query
                        </p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className=" grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {filteredRides.map((ride) => (
                            <motion.div
                                key={ride.id}
                                variants={itemVariants}
                                className="bg-gray-800 rounded-lg overflow-hidden"
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center">
                                            <div className="bg-gray-700 p-2 rounded-lg mr-3">
                                                <Ri24HoursFill className="text-xl text-red-500" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-400">
                                                    {new Date(
                                                        ride.date
                                                    ).toLocaleDateString()}{" "}
                                                    •{" "}
                                                    {new Date(
                                                        ride.date
                                                    ).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <div className="text-white font-medium mr-3">
                                                        ₹{ride.fare}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {ride.distance} •{" "}
                                                        {ride.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {ride.reviewed && (
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={
                                                            i < ride.rating
                                                                ? "text-yellow-400"
                                                                : "text-gray-600"
                                                        }
                                                    >
                                                        <RiStarFill />
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-start">
                                            <RiMapPinLine className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                                            <div>
                                                <div className="text-gray-400 text-xs">
                                                    From
                                                </div>
                                                <div className="text-white text-sm">
                                                    {ride.pickup}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <RiMapPinLine className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                            <div>
                                                <div className="text-gray-400 text-xs">
                                                    To
                                                </div>
                                                <div className="text-white text-sm">
                                                    {ride.destination}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <RiUserLine className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                            <div>
                                                <div className="text-gray-400 text-xs">
                                                    Driver
                                                </div>
                                                <div className="text-white text-sm">
                                                    {ride.driverName} •{" "}
                                                    {ride.vehicleId}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {ride.reviewed && ride.review && (
                                        <div className="mt-4 bg-gray-700/30 rounded-lg p-3">
                                            <div className="text-gray-300 text-sm italic">
                                                "{ride.review}"
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-gray-700 px-4 py-3 bg-gray-800/50">
                                    {ride.status === "completed" ? (
                                        <button
                                            onClick={() => handleRateRide(ride)}
                                            className={`w-full py-2 rounded-lg flex items-center justify-center ${
                                                ride.reviewed
                                                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                                                    : "bg-red-600 hover:bg-red-700 text-white"
                                            }`}
                                        >
                                            {ride.reviewed ? (
                                                <>
                                                    <RiEditLine className="mr-1" />
                                                    Edit Review
                                                </>
                                            ) : (
                                                <>
                                                    <RiStarLine className="mr-1" />
                                                    Rate This Ride
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <div className="text-center text-gray-500 text-sm">
                                            This ride was cancelled and cannot
                                            be reviewed
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {filteredRides.length > 0 && !isLoading && (
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800/50 rounded-lg p-4 mt-6 border border-gray-700/50"
                    >
                        <div className="flex items-start space-x-3">
                            <RiInformationLine className="text-blue-500 text-lg mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-gray-300 text-sm">
                                    Your feedback helps us improve our ambulance
                                    service.
                                </p>
                                <p className="text-gray-400 text-xs mt-1">
                                    Reviews are used to recognize top-performing
                                    drivers and identify areas for improvement.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {isReviewing && renderReviewModal()}
            {showFilters && renderFiltersModal()}
        </div>
    );
};

export default RateAndReview;
