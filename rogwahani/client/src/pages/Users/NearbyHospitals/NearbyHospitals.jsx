import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    RiHospitalLine,
    RiMapPinLine,
    RiTimeLine,
    RiPhoneLine,
    RiCarLine,
    RiStarLine,
    RiFilter3Line,
    RiMapLine,
    RiHeartPulseLine,
    RiBookmarkLine,
    RiBookmarkFill,
    RiArrowLeftRightLine,
    RiUserHeartLine,
    RiSyringeLine,
    RiSearchLine,
    RiCloseCircleLine,
    RiListCheck,
    RiFirstAidKitLine,
    RiGlobalLine,
    RiShieldCrossLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import axios from "axios";

const NearbyHospitals = () => {
    const { user } = useSelector((state) => state.auth);
    const [viewMode, setViewMode] = useState("list"); // list or map
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [favorites, setFavorites] = useState([1, 3]); // Sample favorite hospitals
    const [filterOpen, setFilterOpen] = useState(false);
    const [hospitals, setHospitals] = useState([]);
    const [filters, setFilters] = useState({
        distance: 10,
        specialty: "all",
        rating: 0,
        emergency: true,
    });
    const [searchQuery, setSearchQuery] = useState("");

    // // Sample data for nearby hospitals
    // const hospitals = [
    //   {
    //     id: 1,
    //     name: "City General Hospital",
    //     distance: 2.5,
    //     time: 8,
    //     type: "Multi-Specialty",
    //     address: "123 Medical Center Blvd, City Center",
    //     phone: "+1 (555) 123-4567",
    //     rating: 4.8,
    //     reviews: 267,
    //     emergency: true,
    //     beds: 32,
    //     ambulanceReady: true,
    //     specialties: ["Cardiology", "Neurology", "Trauma Care"],
    //     imageUrl: "/api/placeholder/400/200",
    //   },
    //   {
    //     id: 2,
    //     name: "Apollo Medical Center",
    //     distance: 3.8,
    //     time: 12,
    //     type: "Cardiac & Trauma",
    //     address: "456 Health Parkway, Westside",
    //     phone: "+1 (555) 987-6543",
    //     rating: 4.5,
    //     reviews: 189,
    //     emergency: true,
    //     beds: 24,
    //     ambulanceReady: true,
    //     specialties: ["Cardiology", "Emergency Medicine", "Critical Care"],
    //     imageUrl: "/api/placeholder/400/200",
    //   },
    //   {
    //     id: 3,
    //     name: "Life Care Hospital",
    //     distance: 4.2,
    //     time: 15,
    //     type: "Emergency & ICU",
    //     address: "789 Wellness Drive, Eastside",
    //     phone: "+1 (555) 567-8901",
    //     rating: 4.7,
    //     reviews: 215,
    //     emergency: true,
    //     beds: 18,
    //     ambulanceReady: true,
    //     specialties: ["ICU", "Emergency Services", "Pulmonology"],
    //     imageUrl: "/api/placeholder/400/200",
    //   },
    //   {
    //     id: 4,
    //     name: "Memorial Health Institute",
    //     distance: 5.7,
    //     time: 20,
    //     type: "Research & Specialty",
    //     address: "321 Science Way, Research Park",
    //     phone: "+1 (555) 345-6789",
    //     rating: 4.9,
    //     reviews: 302,
    //     emergency: false,
    //     beds: 8,
    //     ambulanceReady: false,
    //     specialties: ["Oncology", "Genetics", "Robotic Surgery"],
    //     imageUrl: "/api/placeholder/400/200",
    //   },
    //   {
    //     id: 5,
    //     name: "Community Care Center",
    //     distance: 3.1,
    //     time: 10,
    //     type: "Primary Care",
    //     address: "555 Community Circle, Uptown",
    //     phone: "+1 (555) 234-5678",
    //     rating: 4.3,
    //     reviews: 124,
    //     emergency: true,
    //     beds: 15,
    //     ambulanceReady: true,
    //     specialties: ["Family Medicine", "Pediatrics", "General Medicine"],
    //     imageUrl: "/api/placeholder/400/200",
    //   },
    //   {
    //     id: 6,
    //     name: "Children's Hospital",
    //     distance: 6.3,
    //     time: 18,
    //     type: "Pediatric Specialty",
    //     address: "444 Kids Lane, Northside",
    //     phone: "+1 (555) 876-5432",
    //     rating: 4.9,
    //     reviews: 287,
    //     emergency: true,
    //     beds: 40,
    //     ambulanceReady: true,
    //     specialties: ["Pediatrics", "Neonatal Care", "Pediatric Surgery"],
    //     imageUrl: "/api/placeholder/400/200",
    //   },
    // ];
    // Fetch hospitals
    const fetchHospitals = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/hospitals"
            );
            setHospitals(response.data);
        } catch (error) {
            console.error("Error fetching hospitals:", error);
        }
    };
    fetchHospitals();

    // Filter and search the hospitals
    const filteredHospitals = hospitals
        .filter((hospital) => {
            return (
                hospital.distance <= filters.distance &&
                (filters.specialty === "all" ||
                    hospital.specialties.includes(filters.specialty)) &&
                hospital.rating >= filters.rating &&
                (!filters.emergency || hospital.emergency)
            );
        })
        .filter((hospital) => {
            if (!searchQuery) return true;
            return (
                hospital.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                hospital.type
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                hospital.specialties.some((s) =>
                    s.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        });

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

    const handleFavoriteToggle = (hospitalId) => {
        if (favorites.includes(hospitalId)) {
            setFavorites(favorites.filter((id) => id !== hospitalId));
        } else {
            setFavorites([...favorites, hospitalId]);
        }
    };

    const handleHospitalSelect = (hospital) => {
        setSelectedHospital(hospital);
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters({
            ...filters,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <RiStarLine
                    key={i}
                    className={`${
                        i <= Math.floor(rating)
                            ? "text-yellow-400"
                            : "text-gray-500"
                    }`}
                />
            );
        }
        return stars;
    };

    return (
        <div className="container mx-auto pt-12 px-4">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Nearby Hospitals
                </h1>
                <p className="text-gray-400">
                    Find the closest medical facilities for emergency and
                    medical care
                </p>
            </motion.div>

            {/* Search and Filter Bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-gray-800 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-center justify-between"
            >
                <div className="relative w-full md:w-2/3 mb-4 md:mb-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <RiSearchLine className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search hospitals, specialties..."
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <RiCloseCircleLine className="text-gray-400 hover:text-white" />
                        </button>
                    )}
                </div>

                <div className="flex w-full md:w-auto space-x-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg flex items-center"
                    >
                        <RiFilter3Line className="mr-2" /> Filters
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                            setViewMode(viewMode === "list" ? "map" : "list")
                        }
                        className={`px-4 py-3 rounded-lg flex items-center ${
                            viewMode === "map"
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-gray-700 hover:bg-gray-600 text-white"
                        }`}
                    >
                        {viewMode === "list" ? (
                            <>
                                <RiMapLine className="mr-2" /> Map View
                            </>
                        ) : (
                            <>
                                <RiListCheck className="mr-2" /> List View
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>

            {/* Filter Panel - Shown when filterOpen is true */}
            {filterOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800 rounded-lg p-6 mb-6"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">
                            Filter Options
                        </h2>
                        <button
                            onClick={() => setFilterOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <RiCloseCircleLine size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Distance Filter */}
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm">
                                Maximum Distance ({filters.distance} km)
                            </label>
                            <input
                                type="range"
                                name="distance"
                                min="1"
                                max="20"
                                value={filters.distance}
                                onChange={handleFilterChange}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>1 km</span>
                                <span>20 km</span>
                            </div>
                        </div>

                        {/* Specialty Filter */}
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm">
                                Medical Specialty
                            </label>
                            <select
                                name="specialty"
                                value={filters.specialty}
                                onChange={handleFilterChange}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="all">All Specialties</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Emergency Medicine">
                                    Emergency Medicine
                                </option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Oncology">Oncology</option>
                                <option value="ICU">Intensive Care</option>
                            </select>
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm">
                                Minimum Rating
                            </label>
                            <select
                                name="rating"
                                value={filters.rating}
                                onChange={handleFilterChange}
                                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="0">Any Rating</option>
                                <option value="3">3+ Stars</option>
                                <option value="4">4+ Stars</option>
                                <option value="4.5">4.5+ Stars</option>
                            </select>
                        </div>

                        {/* Emergency Services Filter */}
                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="emergency"
                                        checked={filters.emergency}
                                        onChange={handleFilterChange}
                                        className="sr-only"
                                    />
                                    <div className="block bg-gray-700 w-14 h-8 rounded-full"></div>
                                    <div
                                        className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                                            filters.emergency
                                                ? "transform translate-x-6 bg-red-500"
                                                : ""
                                        }`}
                                    ></div>
                                </div>
                                <div className="ml-3 text-white">
                                    Emergency Services Only
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                                setFilters({
                                    distance: 10,
                                    specialty: "all",
                                    rating: 0,
                                    emergency: true,
                                })
                            }
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                        >
                            Reset Filters
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilterOpen(false)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                        >
                            Apply Filters
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Content based on view mode */}
            {viewMode === "list" ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Hospital List */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-2 space-y-6"
                    >
                        {filteredHospitals.length > 0 ? (
                            <>
                                {/* Results Counter */}
                                <motion.p
                                    variants={itemVariants}
                                    className="text-gray-400 text-sm"
                                >
                                    Found {filteredHospitals.length} hospitals
                                    within {filters.distance} km
                                </motion.p>

                                {/* Hospital Cards */}
                                {filteredHospitals.map((hospital) => (
                                    <motion.div
                                        key={hospital.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer border-l-4 ${
                                            selectedHospital?.id === hospital.id
                                                ? "border-red-500"
                                                : "border-transparent"
                                        }`}
                                        onClick={() =>
                                            handleHospitalSelect(hospital)
                                        }
                                    >
                                        <div className="md:flex">
                                            <div className="md:w-1/3 h-48 md:h-auto relative">
                                                <img
                                                    src={hospital.imageUrl}
                                                    alt={hospital.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {hospital.emergency && (
                                                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                                        <RiHeartPulseLine className="mr-1" />{" "}
                                                        Emergency
                                                    </div>
                                                )}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleFavoriteToggle(
                                                            hospital.id
                                                        );
                                                    }}
                                                    className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 p-2 rounded-full"
                                                >
                                                    {favorites.includes(
                                                        hospital.id
                                                    ) ? (
                                                        <RiBookmarkFill className="text-red-500" />
                                                    ) : (
                                                        <RiBookmarkLine className="text-white" />
                                                    )}
                                                </button>
                                            </div>
                                            <div className="p-6 md:w-2/3">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-xl font-bold text-white mb-2">
                                                        {hospital.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-1">
                                                        {renderRatingStars(
                                                            hospital.rating
                                                        )}
                                                        <span className="text-sm text-gray-400 ml-1">
                                                            ({hospital.reviews})
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-sm mb-4">
                                                    {hospital.type}
                                                </p>

                                                <div className="grid grid-cols-2 gap-3 mb-4">
                                                    <div className="flex items-center">
                                                        <div className="bg-blue-500/20 p-1.5 rounded-full text-blue-400">
                                                            <RiMapPinLine />
                                                        </div>
                                                        <span className="ml-2 text-gray-300 text-sm">
                                                            {hospital.distance}{" "}
                                                            km away
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="bg-green-500/20 p-1.5 rounded-full text-green-400">
                                                            <RiTimeLine />
                                                        </div>
                                                        <span className="ml-2 text-gray-300 text-sm">
                                                            {hospital.time} min
                                                            by ambulance
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="bg-purple-500/20 p-1.5 rounded-full text-purple-400">
                                                            <RiFirstAidKitLine />
                                                        </div>
                                                        <span className="ml-2 text-gray-300 text-sm">
                                                            {hospital.beds} beds
                                                            available
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`${
                                                                hospital.ambulanceReady
                                                                    ? "bg-green-500/20 text-green-400"
                                                                    : "bg-red-500/20 text-red-400"
                                                            } p-1.5 rounded-full`}
                                                        >
                                                            <RiCarLine />
                                                        </div>
                                                        <span className="ml-2 text-gray-300 text-sm">
                                                            {hospital.ambulanceReady
                                                                ? "Ambulance Ready"
                                                                : "No Ambulance"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {hospital.specialties
                                                        .slice(0, 3)
                                                        .map(
                                                            (
                                                                specialty,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                    className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                                                                >
                                                                    {specialty}
                                                                </span>
                                                            )
                                                        )}
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <a
                                                        href={`tel:${hospital.phone}`}
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        className="text-sm text-red-400 flex items-center"
                                                    >
                                                        <RiPhoneLine className="mr-1" />{" "}
                                                        {hospital.phone}
                                                    </a>
                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center"
                                                    >
                                                        <RiCarLine className="mr-1" />{" "}
                                                        Book Ambulance
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </>
                        ) : (
                            <motion.div
                                variants={itemVariants}
                                className="bg-gray-800 rounded-lg p-8 shadow-lg text-center"
                            >
                                <RiHospitalLine className="text-gray-600 text-6xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No Hospitals Found
                                </h3>
                                <p className="text-gray-400">
                                    Try adjusting your filters or search
                                    criteria
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setFilters({
                                            distance: 10,
                                            specialty: "all",
                                            rating: 0,
                                            emergency: true,
                                        });
                                        setSearchQuery("");
                                    }}
                                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Reset Filters
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Column - Selected Hospital Details */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {selectedHospital ? (
                            <motion.div
                                variants={itemVariants}
                                className="bg-gray-800 rounded-lg shadow-lg sticky top-6"
                            >
                                <img
                                    src={selectedHospital.imageUrl}
                                    alt={selectedHospital.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-bold text-white">
                                            {selectedHospital.name}
                                        </h2>
                                        <button
                                            onClick={() =>
                                                handleFavoriteToggle(
                                                    selectedHospital.id
                                                )
                                            }
                                            className="text-2xl"
                                        >
                                            {favorites.includes(
                                                selectedHospital.id
                                            ) ? (
                                                <RiBookmarkFill className="text-red-500" />
                                            ) : (
                                                <RiBookmarkLine className="text-white" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center space-x-1">
                                            {renderRatingStars(
                                                selectedHospital.rating
                                            )}
                                        </div>
                                        <span className="text-gray-400 ml-2">
                                            {selectedHospital.rating} (
                                            {selectedHospital.reviews} reviews)
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-start mb-2">
                                            <RiMapPinLine className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                                            <p className="text-gray-300 text-sm">
                                                {selectedHospital.address}
                                            </p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <RiPhoneLine className="text-red-500 mr-2 flex-shrink-0" />
                                            <a
                                                href={`tel:${selectedHospital.phone}`}
                                                className="text-gray-300 text-sm"
                                            >
                                                {selectedHospital.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <RiTimeLine className="text-red-500 mr-2 flex-shrink-0" />
                                            <p className="text-gray-300 text-sm">
                                                {selectedHospital.time} minutes
                                                by ambulance (
                                                {selectedHospital.distance} km)
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <RiUserHeartLine className="text-red-500 mr-2 flex-shrink-0" />
                                            <p className="text-gray-300 text-sm">
                                                {selectedHospital.beds} beds
                                                available
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-white font-medium mb-2">
                                            Specialties
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedHospital.specialties.map(
                                                (specialty, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                                                    >
                                                        {specialty}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                                        >
                                            <RiCarLine className="mr-2" /> Book
                                            Ambulance
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                                        >
                                            <RiMapLine className="mr-2" /> Get
                                            Directions
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                                        >
                                            <RiGlobalLine className="mr-2" />{" "}
                                            Visit Website
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={itemVariants}
                                className="bg-gray-800 rounded-lg p-8 shadow-lg text-center"
                            >
                                <RiShieldCrossLine className="text-red-500 text-6xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Hospital Details
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    Select a hospital from the list to view
                                    detailed information
                                </p>
                                <div className="flex justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                                    >
                                        <RiHeartPulseLine className="mr-2" />{" "}
                                        Emergency SOS
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Emergency Contact Card */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-r from-red-700 to-red-900 rounded-lg p-6 shadow-lg"
                        >
                            <h2 className="text-xl font-semibold text-white mb-3">
                                Emergency Hotline
                            </h2>
                            <p className="text-red-200 mb-4">
                                Our emergency team is available 24/7
                            </p>

                            <motion.a
                                href="tel:108"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-red-700 flex items-center justify-center py-3 rounded-lg font-bold text-xl mb-4"
                            >
                                <RiPhoneLine className="mr-2" /> 108
                            </motion.a>

                            <div className="text-sm text-red-200">
                                <p className="mb-2">
                                    • Call this number for any medical emergency
                                </p>
                                <p className="mb-2">
                                    • Stay calm and provide your exact location
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            ) : (
                // Map View Mode Content
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-800 rounded-lg p-6 shadow-lg"
                >
                    <div className="text-center">
                        <RiMapLine className="text-red-500 text-6xl mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Map View
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Interactive map showing all nearby hospitals would
                            be displayed here. This would include pins for each
                            hospital location.
                        </p>
                        <div className="bg-gray-700 h-96 rounded-lg flex items-center justify-center mb-6">
                            <p className="text-gray-400">
                                Map Interface Placeholder
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setViewMode("list")}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
                        >
                            <RiListCheck className="mr-2" /> Switch to List View
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default NearbyHospitals;
