import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    RiMapPinLine,
    RiMapPinAddLine,
    RiEditLine,
    RiDeleteBinLine,
    RiHomeHeartLine,
    RiBuilding4Line,
    RiHospitalLine,
    RiUserHeartLine,
    RiContactsLine,
    RiArrowLeftLine,
    RiSearchLine,
    RiInformationLine,
    RiCloseLine,
    RiCheckLine,
    RiAlertLine,
} from "react-icons/ri";

const SavedLocations = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);

    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddingLocation, setIsAddingLocation] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);
    const [isDeletingLocation, setIsDeletingLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        type: "home",
        notes: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const BACKEND_URL = "http://localhost:5000";
    const API_URL = `${BACKEND_URL}/api/locations`;

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchLocations();
    }, [token, navigate]);

    const fetchLocations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            };
            const response = await axios.get(API_URL, config);
            console.log("locations : ", response.data.data);

            setLocations(response.data.data);
        } catch (err) {
            console.error("Error fetching locations:", err);
            setError("Failed to load saved locations. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredLocations = Array.isArray(locations)
        ? locations.filter(
              (location) =>
                  location.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                  location.address
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
          )
        : [];

    const handleAddLocation = () => {
        setFormData({
            name: "",
            address: "",
            type: "home",
            notes: "",
        });
        setIsAddingLocation(true);
    };

    const handleEditLocation = (location) => {
        setSelectedLocation(location);
        setFormData({
            name: location.name,
            address: location.address,
            type: location.type,
            notes: location.notes || "",
        });
        setIsEditingLocation(true);
    };

    const handleDeleteLocation = (location) => {
        setSelectedLocation(location);
        setIsDeletingLocation(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveLocation = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            };

            if (isEditingLocation) {
                // Update existing location
                await axios.put(
                    `${API_URL}/${selectedLocation._id}`,
                    formData,
                    config
                );
            } else {
                // Add new location
                await axios.post(API_URL, formData, config);
            }

            // Refresh the locations list
            fetchLocations();

            // Reset form state
            setIsEditingLocation(false);
            setIsAddingLocation(false);
            setSelectedLocation(null);
        } catch (err) {
            console.error("Error saving location:", err);
            setError(
                isEditingLocation
                    ? "Failed to update location. Please try again."
                    : "Failed to add location. Please try again."
            );
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            };

            await axios.delete(`${API_URL}/${selectedLocation._id}`, config);

            // Refresh the locations list
            fetchLocations();

            // Reset form state
            setIsDeletingLocation(false);
            setSelectedLocation(null);
        } catch (err) {
            console.error("Error deleting location:", err);
            setError("Failed to delete location. Please try again.");
        }
    };

    const handleSetDefault = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            };

            await axios.put(`${API_URL}/${id}/set-default`, {}, config);

            // Refresh the locations list
            fetchLocations();
        } catch (err) {
            console.error("Error setting default location:", err);
            setError("Failed to set default location. Please try again.");
        }
    };

    const getLocationIcon = (type) => {
        switch (type) {
            case "home":
                return <RiHomeHeartLine />;
            case "work":
                return <RiBuilding4Line />;
            case "hospital":
                return <RiHospitalLine />;
            case "family":
                return <RiContactsLine />;
            default:
                return <RiMapPinLine />;
        }
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

    const renderLocationForm = () => {
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
                                {isEditingLocation
                                    ? "Edit Location"
                                    : "Add New Location"}
                            </h3>
                            <button
                                onClick={() => {
                                    isEditingLocation
                                        ? setIsEditingLocation(false)
                                        : setIsAddingLocation(false);
                                    setSelectedLocation(null);
                                    setError(null);
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                <RiCloseLine className="text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="p-5 space-y-4">
                        {error && (
                            <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-4">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Location Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. Home, Office, Parent's House"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={formData.name}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Address
                            </label>
                            <textarea
                                name="address"
                                placeholder="Enter full address"
                                rows="3"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={formData.address}
                                onChange={handleFormChange}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Location Type
                            </label>
                            <select
                                name="type"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={formData.type}
                                onChange={handleFormChange}
                            >
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                                <option value="family">Family</option>
                                <option value="hospital">Hospital</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Notes (Optional)
                            </label>
                            <textarea
                                name="notes"
                                placeholder="Add any helpful details about this location"
                                rows="2"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={formData.notes}
                                onChange={handleFormChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className="p-5 border-t border-gray-700 flex justify-end space-x-3">
                        <button
                            onClick={() => {
                                isEditingLocation
                                    ? setIsEditingLocation(false)
                                    : setIsAddingLocation(false);
                                setSelectedLocation(null);
                                setError(null);
                            }}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveLocation}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                        >
                            <RiCheckLine className="mr-1" />
                            Save Location
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    };

    const renderDeleteConfirmation = () => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                <div className="bg-gray-800 rounded-lg w-full max-w-md">
                    <div className="p-5">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                <RiAlertLine className="text-2xl text-red-500" />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-white text-center mb-2">
                            Delete Location
                        </h3>
                        <p className="text-gray-300 text-center">
                            Are you sure you want to delete "
                            {selectedLocation?.name}"? This action cannot be
                            undone.
                        </p>

                        {error && (
                            <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm mt-4">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="p-5 border-t border-gray-700 flex justify-center space-x-3">
                        <button
                            onClick={() => {
                                setIsDeletingLocation(false);
                                setSelectedLocation(null);
                                setError(null);
                            }}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                        >
                            <RiDeleteBinLine className="mr-1" />
                            Delete
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
                            Saved Locations
                        </h1>
                        <p className="text-gray-400">
                            Manage your frequently used pickup and drop-off
                            locations
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
                            placeholder="Search saved locations..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button
                        onClick={handleAddLocation}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center whitespace-nowrap"
                    >
                        <RiMapPinAddLine className="mr-2" />
                        Add New Location
                    </button>
                </div>

                {error &&
                    !isAddingLocation &&
                    !isEditingLocation &&
                    !isDeletingLocation && (
                        <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-6">
                            <div className="flex items-start">
                                <RiAlertLine className="mt-0.5 mr-2 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                {isLoading ? (
                    <div className="py-20 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : locations.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-800 rounded-lg p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <RiMapPinLine className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">
                            No saved locations yet
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Save your frequently used addresses to book
                            ambulances faster
                        </p>
                        <button
                            onClick={handleAddLocation}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center mx-auto"
                        >
                            <RiMapPinAddLine className="mr-2" />
                            Add Your First Location
                        </button>
                    </motion.div>
                ) : filteredLocations.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <h3 className="text-xl font-medium text-white mb-2">
                            No results found
                        </h3>
                        <p className="text-gray-400">
                            No locations match your search query "{searchTerm}"
                        </p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {filteredLocations.map((location) => (
                            <motion.div
                                key={location._id}
                                variants={itemVariants}
                                className="bg-gray-800 rounded-lg overflow-hidden"
                            >
                                <div className="p-4 flex items-start">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                            location.type === "home"
                                                ? "bg-blue-500/20 text-blue-500"
                                                : location.type === "work"
                                                  ? "bg-purple-500/20 text-purple-500"
                                                  : location.type === "hospital"
                                                    ? "bg-red-500/20 text-red-500"
                                                    : location.type === "family"
                                                      ? "bg-green-500/20 text-green-500"
                                                      : "bg-orange-500/20 text-orange-500"
                                        }`}
                                    >
                                        {getLocationIcon(location.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <h3 className="font-medium text-white">
                                                {location.name}
                                            </h3>
                                            {location.isDefault && (
                                                <span className="ml-2 text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 text-sm mt-1">
                                            {location.address}
                                        </p>
                                        {location.notes && (
                                            <p className="text-gray-500 text-xs mt-2 flex items-start">
                                                <RiInformationLine className="mr-1 flex-shrink-0 mt-0.5" />
                                                {location.notes}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex space-x-2 ml-2">
                                        <button
                                            onClick={() =>
                                                handleEditLocation(location)
                                            }
                                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
                                            title="Edit"
                                        >
                                            <RiEditLine />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteLocation(location)
                                            }
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-full"
                                            title="Delete"
                                        >
                                            <RiDeleteBinLine />
                                        </button>
                                    </div>
                                </div>
                                <div className="border-t border-gray-700 px-4 py-2 flex justify-between items-center bg-gray-800/50">
                                    <span className="text-xs text-gray-500">
                                        Added{" "}
                                        {new Date(
                                            location.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                    {!location.isDefault && (
                                        <button
                                            onClick={() =>
                                                handleSetDefault(location._id)
                                            }
                                            className="text-xs text-red-500 hover:text-red-400"
                                        >
                                            Set as default
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {filteredLocations.length > 0 && !isLoading && (
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800/50 rounded-lg p-4 mt-6 border border-gray-700/50"
                    >
                        <div className="flex items-start space-x-3">
                            <RiInformationLine className="text-blue-500 text-lg mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-gray-300 text-sm">
                                    Your default location will be automatically
                                    selected when booking an ambulance.
                                </p>
                                <p className="text-gray-400 text-xs mt-1">
                                    You can change your default location anytime
                                    by clicking "Set as default" on any saved
                                    address.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {(isAddingLocation || isEditingLocation) && renderLocationForm()}
            {isDeletingLocation && renderDeleteConfirmation()}
        </div>
    );
};

export default SavedLocations;
