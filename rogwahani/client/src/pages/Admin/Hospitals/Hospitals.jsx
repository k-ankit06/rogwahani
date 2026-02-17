import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    FiPhone,
    FiMapPin,
    FiStar,
    FiClock,
    FiFlag,
    FiAward,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiAlertCircle,
    FiCheck,
    FiX,
    FiSearch,
    FiFilter,
    FiRefreshCw,
} from "react-icons/fi";
import { MdLocalHospital, MdEmergency } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        distance: 0,
        time: 0,
        type: "",
        address: "",
        phone: "",
        rating: 0,
        reviews: 0,
        emergency: false,
        beds: 0,
        ambulanceReady: false,
        specialties: [],
        imageUrl: "",
        website: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        type: "",
        emergency: "",
        maxDistance: "",
        minRating: "",
        specialty: "",
    });
    const [searchTerm, setSearchTerm] = useState("");

    const API_URL = "http://localhost:5000/api/hospitals";

    // Fetch hospitals
    const fetchHospitals = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setHospitals(response.data);
        } catch (error) {
            console.error("Error fetching hospitals:", error);
            toast.error("Failed to load hospitals");
        } finally {
            setLoading(false);
        }
    };

    // Apply filters
    const applyFilters = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();

            if (filters.type) queryParams.append("type", filters.type);
            if (filters.emergency)
                queryParams.append("emergency", filters.emergency);
            if (filters.maxDistance)
                queryParams.append("maxDistance", filters.maxDistance);
            if (filters.minRating)
                queryParams.append("minRating", filters.minRating);
            if (filters.specialty)
                queryParams.append("specialty", filters.specialty);

            const response = await axios.get(
                `${API_URL}/search/filters?${queryParams.toString()}`
            );
            setHospitals(response.data);
            toast.info("Filters applied");
        } catch (error) {
            console.error("Error applying filters:", error);
            toast.error("Failed to apply filters");
        } finally {
            setLoading(false);
        }
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            type: "",
            emergency: "",
            maxDistance: "",
            minRating: "",
            specialty: "",
        });
        fetchHospitals();
    };

    // Create hospital
    const createHospital = async () => {
        try {
            const specialtiesArray = formData.specialties
                .toString()
                .split(",")
                .map((s) => s.trim());
            const hospitalData = { ...formData, specialties: specialtiesArray };

            await axios.post(API_URL, hospitalData);
            toast.success("Hospital added successfully");
            setIsModalOpen(false);
            fetchHospitals();
            resetForm();
        } catch (error) {
            console.error("Error creating hospital:", error);
            toast.error("Failed to add hospital");
        }
    };

    // Update hospital
    const updateHospital = async () => {
        try {
            const specialtiesArray =
                typeof formData.specialties === "string"
                    ? formData.specialties.split(",").map((s) => s.trim())
                    : formData.specialties;

            const hospitalData = { ...formData, specialties: specialtiesArray };

            await axios.put(`${API_URL}/${selectedHospital._id}`, hospitalData);
            toast.success("Hospital updated successfully");
            setIsModalOpen(false);
            fetchHospitals();
            resetForm();
        } catch (error) {
            console.error("Error updating hospital:", error);
            toast.error("Failed to update hospital");
        }
    };

    // Delete hospital
    const deleteHospital = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            toast.success("Hospital deleted successfully");
            fetchHospitals();
        } catch (error) {
            console.error("Error deleting hospital:", error);
            toast.error("Failed to delete hospital");
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateHospital();
        } else {
            createHospital();
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            name: "",
            distance: 0,
            time: 0,
            type: "",
            address: "",
            phone: "",
            rating: 0,
            reviews: 0,
            emergency: false,
            beds: 0,
            ambulanceReady: false,
            specialties: [],
            imageUrl: "",
            website: "",
        });
        setIsEditing(false);
        setSelectedHospital(null);
    };

    // Open edit modal
    const openEditModal = (hospital) => {
        setSelectedHospital(hospital);
        setFormData({
            ...hospital,
            specialties: hospital.specialties.join(", "),
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    // Open add modal
    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    // Filter based on search term
    const filteredHospitals = hospitals.filter(
        (hospital) =>
            hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch hospitals on component mount
    useEffect(() => {
        fetchHospitals();
    }, []);

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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                theme="dark"
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <motion.h1
                    className="text-2xl md:text-3xl font-bold text-red-500 mb-4 md:mb-0"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <MdLocalHospital className="inline mr-2" /> Nearby Hospitals
                </motion.h1>

                <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
                    {/* Search input */}
                    <div className="relative flex-1 md:w-64">
                        <FiSearch className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search hospitals..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter button */}
                    <motion.button
                        className="flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        <FiFilter className="mr-2" />
                        {filterOpen ? "Hide Filters" : "Show Filters"}
                    </motion.button>

                    {/* Add hospital button */}
                    <motion.button
                        className="flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        whileTap={{ scale: 0.95 }}
                        onClick={openAddModal}
                    >
                        <FiPlus className="mr-2" /> Add Hospital
                    </motion.button>
                </div>
            </div>

            {/* Filters */}
            {filterOpen && (
                <motion.div
                    className="mb-6 p-4 bg-gray-800 rounded-lg shadow-lg"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-red-400">
                        Filter Hospitals
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Hospital Type
                            </label>
                            <select
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                value={filters.type}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        type: e.target.value,
                                    })
                                }
                            >
                                <option value="">All Types</option>
                                <option value="Multi-Specialty">
                                    Multi-Specialty
                                </option>
                                <option value="Specialty">Specialty</option>
                                <option value="General">General</option>
                                <option value="Clinic">Clinic</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Emergency Services
                            </label>
                            <select
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                value={filters.emergency}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        emergency: e.target.value,
                                    })
                                }
                            >
                                <option value="">All</option>
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Max Distance (km)
                            </label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                value={filters.maxDistance}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        maxDistance: e.target.value,
                                    })
                                }
                                placeholder="e.g. 5"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Min Rating
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                value={filters.minRating}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        minRating: e.target.value,
                                    })
                                }
                                placeholder="e.g. 4.0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Specialty
                            </label>
                            <input
                                type="text"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                value={filters.specialty}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        specialty: e.target.value,
                                    })
                                }
                                placeholder="e.g. Cardiology"
                            />
                        </div>

                        <div className="flex items-end gap-2">
                            <motion.button
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                whileTap={{ scale: 0.95 }}
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </motion.button>
                            <motion.button
                                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                whileTap={{ scale: 0.95 }}
                                onClick={resetFilters}
                            >
                                <FiRefreshCw className="inline mr-1" /> Reset
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Loading indicator */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <motion.div
                        className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                        }}
                    />
                </div>
            )}

            {/* Hospitals grid */}
            {!loading && filteredHospitals.length > 0 ? (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredHospitals.map((hospital) => (
                        <motion.div
                            key={hospital._id}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="h-48 bg-gray-700 relative overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={hospital.imageUrl}
                                    alt={hospital.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-0 left-0 p-2">
                                    {hospital.emergency && (
                                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center">
                                            <MdEmergency className="mr-1" />{" "}
                                            Emergency
                                        </span>
                                    )}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                    <h3 className="text-xl font-bold text-white">
                                        {hospital.name}
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        {hospital.type}
                                    </p>
                                </div>
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <motion.button
                                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none"
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => openEditModal(hospital)}
                                    >
                                        <FiEdit2 size={14} />
                                    </motion.button>
                                    <motion.button
                                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none"
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() =>
                                            deleteHospital(hospital._id)
                                        }
                                    >
                                        <FiTrash2 size={14} />
                                    </motion.button>
                                </div>
                            </motion.div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        <FiStar className="text-yellow-400 mr-1" />
                                        <span className="text-white font-medium">
                                            {hospital.rating}
                                        </span>
                                        <span className="text-gray-400 text-sm ml-1">
                                            ({hospital.reviews} reviews)
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <FiMapPin className="text-red-400 mr-1" />
                                        <span className="text-white">
                                            {hospital.distance} km
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <FiClock className="text-green-400 mr-1" />
                                        <span className="text-white">
                                            {hospital.time} min
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <p className="text-gray-300 flex items-start">
                                        <FiMapPin className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                                        <span>{hospital.address}</span>
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <p className="text-gray-300 flex items-center">
                                        <FiPhone className="text-gray-400 mr-2" />
                                        <span>{hospital.phone}</span>
                                    </p>
                                </div>

                                <div className="mb-3 flex items-center">
                                    <FiFlag className="text-gray-400 mr-2" />
                                    <span className="text-white">
                                        {hospital.beds} available beds
                                    </span>
                                    {hospital.ambulanceReady && (
                                        <span className="ml-4 bg-green-900 text-green-300 text-xs px-2 py-1 rounded-full flex items-center">
                                            <FiCheck className="mr-1" />{" "}
                                            Ambulance Ready
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <div className="text-sm text-gray-400 mb-2 flex items-center">
                                        <FiAward className="mr-2" /> Specialties
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {hospital.specialties.map(
                                            (specialty, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-red-900 text-red-200 px-2 py-1 rounded-md text-xs"
                                                >
                                                    {specialty}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                !loading && <></>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
                    <motion.div
                        className="bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-red-500">
                                    {isEditing
                                        ? "Edit Hospital"
                                        : "Add New Hospital"}
                                </h2>
                                <button
                                    className="text-gray-400 hover:text-white"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Hospital Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Hospital Type*
                                        </label>
                                        <input
                                            type="text"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="e.g. Multi-Specialty, Specialty, General"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Distance (km)*
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="distance"
                                            value={formData.distance}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Travel Time (minutes)*
                                        </label>
                                        <input
                                            type="number"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Address*
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Phone Number*
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Website
                                        </label>
                                        <input
                                            type="text"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="e.g. https://www.hospital.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Rating (0-5)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Number of Reviews
                                        </label>
                                        <input
                                            type="number"
                                            name="reviews"
                                            value={formData.reviews}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Available Beds
                                        </label>
                                        <input
                                            type="number"
                                            name="beds"
                                            value={formData.beds}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="/api/placeholder/400/200"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Specialties (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            name="specialties"
                                            value={formData.specialties}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="e.g. Cardiology, Neurology, Trauma Care"
                                        />
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="emergency"
                                                name="emergency"
                                                checked={formData.emergency}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded"
                                            />
                                            <label
                                                htmlFor="emergency"
                                                className="ml-2 text-sm text-gray-300"
                                            >
                                                Emergency Services
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="ambulanceReady"
                                                name="ambulanceReady"
                                                checked={
                                                    formData.ambulanceReady
                                                }
                                                onChange={handleChange}
                                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded"
                                            />
                                            <label
                                                htmlFor="ambulanceReady"
                                                className="ml-2 text-sm text-gray-300"
                                            >
                                                Ambulance Ready
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6 space-x-4">
                                    <motion.button
                                        type="button"
                                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            resetForm();
                                        }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isEditing
                                            ? "Save Changes"
                                            : "Add Hospital"}
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* No results found state with empty database */}
            {!loading && hospitals.length === 0 && (
                <motion.div
                    className="text-center py-16 bg-gray-800 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <MdLocalHospital className="mx-auto text-red-500 text-6xl mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">
                        No Hospitals in Database
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Start by adding your first hospital to the system.
                    </p>
                    <motion.button
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 inline-flex items-center"
                        whileTap={{ scale: 0.95 }}
                        onClick={openAddModal}
                    >
                        <FiPlus className="mr-2" /> Add Your First Hospital
                    </motion.button>
                </motion.div>
            )}

            {/* Pagination (if needed in the future) */}
            {!loading && filteredHospitals.length > 0 && (
                <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                        <motion.button
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            whileTap={{
                                scale: (active) => (active ? 0.95 : 1),
                            }}
                            disabled={true}
                        >
                            Previous
                        </motion.button>
                        <div className="px-4 py-2 bg-red-600 text-white rounded-lg">
                            1
                        </div>
                        <motion.button
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            whileTap={{
                                scale: (active) => (active ? 0.95 : 1),
                            }}
                            disabled={true}
                        >
                            Next
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hospitals;
