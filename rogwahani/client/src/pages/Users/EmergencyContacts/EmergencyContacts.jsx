import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    RiUserLine,
    RiUserAddLine,
    RiEditLine,
    RiDeleteBinLine,
    RiUserHeartLine,
    RiHospitalLine,
    RiParentLine,
    RiTeamLine,
    RiUserStarLine,
    RiSearchLine,
    RiInformationLine,
    RiCloseLine,
    RiCheckLine,
    RiAlertLine,
    RiPhoneLine,
} from "react-icons/ri";

const EmergencyContacts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);
    console.log(user, token);

    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddingContact, setIsAddingContact] = useState(false);
    const [isEditingContact, setIsEditingContact] = useState(false);
    const [isDeletingContact, setIsDeletingContact] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        relationship: "family",
        notes: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const BACKEND_URL = "http://localhost:5000";
    const API_URL = `${BACKEND_URL}/api/emergency-contacts`;

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchContacts();
    }, [token, navigate]);

    const fetchContacts = async () => {
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
            console.log(response);
            setContacts(response.data);
        } catch (err) {
            console.error("Error fetching contacts:", err);
            setError("Failed to load emergency contacts. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredContacts = contacts.filter(
        (contact) =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddContact = () => {
        setFormData({
            name: "",
            phone: "",
            relationship: "family",
            notes: "",
        });
        setIsAddingContact(true);
    };

    const handleEditContact = (contact) => {
        setSelectedContact(contact);
        setFormData({
            name: contact.name,
            phone: contact.phone,
            relationship: contact.relationship,
            notes: contact.notes || "",
        });
        setIsEditingContact(true);
    };

    const handleDeleteContact = (contact) => {
        setSelectedContact(contact);
        setIsDeletingContact(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveContact = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            };

            if (isEditingContact) {
                // Update existing contact
                await axios.put(
                    `${API_URL}/${selectedContact._id}`,
                    formData,
                    config
                );
            } else {
                // Add new contact
                await axios.post(API_URL, formData, config);
            }

            // Refresh the contacts list
            await fetchContacts();

            // Close modal
            if (isEditingContact) {
                setIsEditingContact(false);
            } else {
                setIsAddingContact(false);
            }
            setSelectedContact(null);
        } catch (err) {
            console.error("Error saving contact:", err);
            setError("Failed to save contact. Please try again.");
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

            await axios.delete(`${API_URL}/${selectedContact._id}`, config);

            // Refresh the contacts list
            await fetchContacts();

            setIsDeletingContact(false);
            setSelectedContact(null);
        } catch (err) {
            console.error("Error deleting contact:", err);
            setError("Failed to delete contact. Please try again.");
        }
    };

    const handleSetPrimary = async (id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            };

            await axios.put(`${API_URL}/primary/${id}`, {}, config);

            // Refresh the contacts list
            await fetchContacts();
        } catch (err) {
            console.error("Error setting primary contact:", err);
            setError("Failed to set primary contact. Please try again.");
        }
    };

    const getContactIcon = (relationship) => {
        switch (relationship) {
            case "family":
                return <RiParentLine />;
            case "doctor":
                return <RiUserHeartLine />;
            case "hospital":
                return <RiHospitalLine />;
            case "friend":
                return <RiUserStarLine />;
            case "colleague":
                return <RiTeamLine />;
            default:
                return <RiUserLine />;
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

    const renderContactForm = () => {
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
                                {isEditingContact
                                    ? "Edit Contact"
                                    : "Add New Contact"}
                            </h3>
                            <button
                                onClick={() => {
                                    isEditingContact
                                        ? setIsEditingContact(false)
                                        : setIsAddingContact(false);
                                    setSelectedContact(null);
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                <RiCloseLine className="text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="p-5 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. John Smith"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={formData.name}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="e.g. +91 9876543210"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={formData.phone}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Relationship
                            </label>
                            <select
                                name="relationship"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={formData.relationship}
                                onChange={handleFormChange}
                            >
                                <option value="family">Family</option>
                                <option value="friend">Friend</option>
                                <option value="doctor">Doctor</option>
                                <option value="hospital">Hospital</option>
                                <option value="colleague">Colleague</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Notes (Optional)
                            </label>
                            <textarea
                                name="notes"
                                placeholder="Add any helpful information about this contact"
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
                                isEditingContact
                                    ? setIsEditingContact(false)
                                    : setIsAddingContact(false);
                                setSelectedContact(null);
                            }}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveContact}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
                        >
                            <RiCheckLine className="mr-1" />
                            Save Contact
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
                            Delete Contact
                        </h3>
                        <p className="text-gray-300 text-center">
                            Are you sure you want to delete "
                            {selectedContact?.name}"? This action cannot be
                            undone.
                        </p>
                    </div>

                    <div className="p-5 border-t border-gray-700 flex justify-center space-x-3">
                        <button
                            onClick={() => {
                                setIsDeletingContact(false);
                                setSelectedContact(null);
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
                            Emergency Contacts
                        </h1>
                        <p className="text-gray-400">
                            Manage contacts that will be notified in case of an
                            emergency
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
                            placeholder="Search emergency contacts..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button
                        onClick={handleAddContact}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center whitespace-nowrap"
                    >
                        <RiUserAddLine className="mr-2" />
                        Add New Contact
                    </button>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-900/50 border border-red-700 text-red-100 p-4 rounded-lg mb-6"
                    >
                        <div className="flex items-start">
                            <RiAlertLine className="text-red-400 text-lg mt-0.5 mr-2 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    </motion.div>
                )}

                {isLoading ? (
                    <div className="py-20 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                    </div>
                ) : contacts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-800 rounded-lg p-8 text-center"
                    >
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <RiUserLine className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">
                            No emergency contacts yet
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Add contacts who should be notified in case of an
                            emergency
                        </p>
                        <button
                            onClick={handleAddContact}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center mx-auto"
                        >
                            <RiUserAddLine className="mr-2" />
                            Add Your First Contact
                        </button>
                    </motion.div>
                ) : filteredContacts.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <h3 className="text-xl font-medium text-white mb-2">
                            No results found
                        </h3>
                        <p className="text-gray-400">
                            No contacts match your search query "{searchTerm}"
                        </p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {filteredContacts.map((contact) => (
                            <motion.div
                                key={contact._id}
                                variants={itemVariants}
                                className="bg-gray-800 rounded-lg overflow-hidden"
                            >
                                <div className="p-4 flex items-start">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                            contact.relationship === "family"
                                                ? "bg-green-500/20 text-green-500"
                                                : contact.relationship ===
                                                    "doctor"
                                                  ? "bg-blue-500/20 text-blue-500"
                                                  : contact.relationship ===
                                                      "hospital"
                                                    ? "bg-red-500/20 text-red-500"
                                                    : contact.relationship ===
                                                        "friend"
                                                      ? "bg-purple-500/20 text-purple-500"
                                                      : "bg-orange-500/20 text-orange-500"
                                        }`}
                                    >
                                        {getContactIcon(contact.relationship)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <h3 className="font-medium text-white">
                                                {contact.name}
                                            </h3>
                                            {contact.isPrimary && (
                                                <span className="ml-2 text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                                    Primary
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 text-sm mt-1 flex items-center">
                                            <RiPhoneLine className="mr-1" />
                                            {contact.phone}
                                        </p>
                                        {contact.notes && (
                                            <p className="text-gray-500 text-xs mt-2 flex items-start">
                                                <RiInformationLine className="mr-1 flex-shrink-0 mt-0.5" />
                                                {contact.notes}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex space-x-2 ml-2">
                                        <button
                                            onClick={() =>
                                                handleEditContact(contact)
                                            }
                                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
                                            title="Edit"
                                        >
                                            <RiEditLine />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteContact(contact)
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
                                            contact.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                    {!contact.isPrimary && (
                                        <button
                                            onClick={() =>
                                                handleSetPrimary(contact._id)
                                            }
                                            className="text-xs text-red-500 hover:text-red-400"
                                        >
                                            Set as primary
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {filteredContacts.length > 0 && !isLoading && (
                    <motion.div
                        variants={itemVariants}
                        className="bg-gray-800/50 rounded-lg p-4 mt-6 border border-gray-700/50"
                    >
                        <div className="flex items-start space-x-3">
                            <RiInformationLine className="text-blue-500 text-lg mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-gray-300 text-sm">
                                    Your primary contact will be automatically
                                    contacted first in case of an emergency.
                                </p>
                                <p className="text-gray-400 text-xs mt-1">
                                    You can change your primary contact anytime
                                    by clicking "Set as primary" on any saved
                                    contact.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {(isAddingContact || isEditingContact) && renderContactForm()}
            {isDeletingContact && renderDeleteConfirmation()}
        </div>
    );
};

export default EmergencyContacts;
