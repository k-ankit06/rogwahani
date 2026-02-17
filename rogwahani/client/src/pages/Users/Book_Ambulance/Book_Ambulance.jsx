import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    Ri24HoursLine,
    RiUserLine,
    RiMapPinLine,
    RiMapPinTimeLine,
    RiHeartPulseLine,
    RiCalendarLine,
    RiTimeLine,
    RiFileListLine,
    RiUserHeartLine,
    RiArrowLeftLine,
    RiArrowRightLine,
    RiInformationLine,
    RiPhoneLine,
    RiHospitalLine,
    RiHomeHeartLine,
    RiContactsLine,
    Ri24HoursFill,
    RiSyringeLine,
    RiMentalHealthLine,
    RiShieldCheckLine,
    RiMoneyDollarCircleLine,
} from "react-icons/ri";

const BookAmbulance = () => {
    const { user, token } = useSelector((state) => state.auth);
    const [step, setStep] = useState(1);
    const [bookingType, setBookingType] = useState("self");
    const [ambulanceType, setAmbulanceType] = useState("");
    const [urgency, setUrgency] = useState("scheduled");
    const [dateTime, setDateTime] = useState({
        date: "",
        time: "",
    });
    const [locations, setLocations] = useState({
        pickup: "",
        dropoff: "",
    });
    const [patientInfo, setPatientInfo] = useState({
        name: user?.name || "",
        age: "",
        gender: "",
        phone: user?.phone || "",
        medicalCondition: "",
        additionalNotes: "",
    });
    const [savedLocations, setSavedLocations] = useState([]);
    const [showLocationSuggestions, setShowLocationSuggestions] =
        useState(false);
    const [showHospitalSuggestions, setShowHospitalSuggestions] =
        useState(false);
    const [HospitalSuggestions, setHospitalSuggestions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [bookingId, setBookingId] = useState("");

    // Sample data
    const ambulanceTypes = [
        {
            id: "basic",
            name: "Basic Life Support",
            icon: <Ri24HoursLine />,
            description:
                "For stable patients requiring basic medical monitoring",
            price: "₹800",
            features: [
                "Basic medical equipment",
                "Trained EMT",
                "Oxygen support",
            ],
        },
        {
            id: "advanced",
            name: "Advanced Life Support",
            icon: <RiHeartPulseLine />,
            description:
                "For patients requiring advanced medical care during transport",
            price: "₹1500",
            features: [
                "Advanced cardiac monitoring",
                "Paramedics onboard",
                "Critical care equipment",
                "IV administration",
            ],
        },
        {
            id: "patient-transport",
            name: "Patient Transport",
            icon: <RiUserHeartLine />,
            description:
                "Comfortable transport for non-emergency medical appointments",
            price: "₹600",
            features: [
                "Comfortable stretcher",
                "Attendant",
                "Wheelchair accessible",
            ],
        },
        {
            id: "cardiac",
            name: "Cardiac Ambulance",
            icon: <RiMentalHealthLine />,
            description:
                "Specialized for cardiac emergencies with advanced equipment",
            price: "₹2000",
            features: [
                "Defibrillator",
                "Cardiac specialists",
                "ECG monitoring",
                "Emergency medications",
            ],
        },
    ];

    // const hospitalSuggestions = [
    //   { id: 1, name: "Apollo Hospital", address: "Sector 26, Pradhikaran", distance: "2.5 km" },
    //   { id: 2, name: "City Hospital", address: "MG Road, City Center", distance: "3.8 km" },
    //   { id: 3, name: "Life Care Medical Center", address: "Hinjewadi Phase 1", distance: "4.2 km" },
    //   { id: 4, name: "Harmony Healthcare", address: "Aundh Main Road", distance: "5.1 km" },
    // ];

    useEffect(() => {
        // Set user data when component loads
        if (user && bookingType === "self") {
            setPatientInfo((prev) => ({
                ...prev,
                name: user?.name || "",
                phone: user?.phone || "",
            }));
        }

        // Load saved locations (would come from API in real implementation)
        //setSavedLocations(recentLocations);
    }, [user, bookingType]);

    // useEffect(() => {
    //   const fetchSavedLocations = async () => {
    //     try {
    //       const response = await fetch("http://localhost:5000/api/locations", {
    //         headers: { "x-auth-token": token }
    //       });

    //       const data = await response.json();
    //       console.log(data.data)
    //       if (response.ok) {
    //         setSavedLocations(data.data);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching saved locations:", error);
    //     }
    //   };

    //   fetchSavedLocations();
    // }, []);

    useEffect(() => {
        const fetchSavedLocations = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/locations",
                    {
                        headers: { "x-auth-token": token },
                    }
                );
                const Hospitalresponse = await axios.get(
                    "http://localhost:5000/api/hospitals"
                );

                console.log(response.data);

                setSavedLocations(response.data.data);
                setHospitalSuggestions(Hospitalresponse.data);
            } catch (error) {
                console.error(
                    "Error fetching saved locations:",
                    error.response?.data || error.message
                );
            }
        };

        fetchSavedLocations();
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Generate a 6-digit booking ID
            const generatedBookingId =
                "RW" +
                Math.floor(100000 + Math.random() * 900000)
                    .toString()
                    .slice(0, 6);

            const response = await axios.post(
                "http://localhost:5000/api/bookings",
                {
                    bookingId: generatedBookingId,
                    bookingType,
                    ambulanceType,
                    urgency,
                    dateTime,
                    locations,
                    patientInfo,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token,
                    },
                }
            );

            if (response.status === 201) {
                setBookingId(response.data.bookingId); // Store booking ID from backend
                setBookingConfirmed(true);
            }
        } catch (error) {
            console.error(
                "Booking failed:",
                error.response?.data || error.message
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNextStep = () => {
        if (step < 4) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        } else {
            handleSubmit();
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleBookingTypeChange = (type) => {
        setBookingType(type);
        if (type === "self" && user) {
            setPatientInfo((prev) => ({
                ...prev,
                name: user.name || "",
                phone: user.phone || "",
            }));
        } else {
            setPatientInfo((prev) => ({
                ...prev,
                name: "",
                phone: "",
            }));
        }
    };

    const handleLocationSelect = (location, type) => {
        setLocations((prev) => ({
            ...prev,
            [type]: location.address,
        }));
        if (type === "pickup") {
            setShowLocationSuggestions(false);
        } else {
            setShowHospitalSuggestions(false);
        }
    };

    const handlePatientInfoChange = (e) => {
        const { name, value } = e.target;
        setPatientInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
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

    const renderStepIndicator = () => {
        return (
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    {[1, 2, 3, 4].map((stepNumber) => (
                        <div
                            key={stepNumber}
                            className="flex flex-col items-center"
                        >
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    step >= stepNumber
                                        ? "bg-red-600"
                                        : "bg-gray-700"
                                } ${step === stepNumber ? "ring-4 ring-red-300 ring-opacity-30" : ""}`}
                            >
                                {stepNumber < step ? (
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    <span className="text-white font-medium">
                                        {stepNumber}
                                    </span>
                                )}
                            </div>
                            <span
                                className={`mt-2 text-xs ${step >= stepNumber ? "text-gray-200" : "text-gray-500"}`}
                            >
                                {stepNumber === 1 && "Service Type"}
                                {stepNumber === 2 && "Location"}
                                {stepNumber === 3 && "Patient Info"}
                                {stepNumber === 4 && "Confirmation"}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="relative flex items-center justify-between mt-4">
                    <div className="absolute left-0 right-0 h-1 bg-gray-700">
                        <div
                            className="h-1 bg-red-600 transition-all duration-300"
                            style={{ width: `${(step - 1) * 33.33}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    };

    const renderServiceTypeStep = () => {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 rounded-lg p-6"
                >
                    <h3 className="text-lg font-medium text-white mb-4">
                        Who needs the ambulance?
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleBookingTypeChange("self")}
                            className={`p-4 rounded-lg flex flex-col items-center cursor-pointer border-2 ${
                                bookingType === "self"
                                    ? "border-red-500 bg-gray-700"
                                    : "border-gray-700"
                            }`}
                        >
                            <RiUserLine className="text-3xl text-red-500 mb-2" />
                            <h4 className="font-medium text-white">
                                For Myself
                            </h4>
                            <p className="text-xs text-gray-400 text-center mt-1">
                                Book an ambulance for your own transport
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleBookingTypeChange("other")}
                            className={`p-4 rounded-lg flex flex-col items-center cursor-pointer border-2 ${
                                bookingType === "other"
                                    ? "border-red-500 bg-gray-700"
                                    : "border-gray-700"
                            }`}
                        >
                            <RiContactsLine className="text-3xl text-red-500 mb-2" />
                            <h4 className="font-medium text-white">
                                For Someone Else
                            </h4>
                            <p className="text-xs text-gray-400 text-center mt-1">
                                Book an ambulance for a family member or friend
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 rounded-lg p-6"
                >
                    <h3 className="text-lg font-medium text-white mb-4">
                        Select ambulance type
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ambulanceTypes.map((type) => (
                            <motion.div
                                key={type.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setAmbulanceType(type.id)}
                                className={`p-4 rounded-lg cursor-pointer border-2 ${
                                    ambulanceType === type.id
                                        ? "border-red-500 bg-gray-700"
                                        : "border-gray-700"
                                }`}
                            >
                                <div className="flex items-start">
                                    <div className="bg-red-500/20 p-3 rounded-full text-red-500">
                                        {type.icon}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium text-white">
                                                {type.name}
                                            </h4>
                                            <span className="text-red-500 font-medium">
                                                {type.price}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {type.description}
                                        </p>
                                        <div className="mt-3">
                                            <ul className="text-xs text-gray-300 space-y-1">
                                                {type.features.map(
                                                    (feature, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-center"
                                                        >
                                                            <svg
                                                                className="w-3 h-3 text-green-400 mr-2"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            {feature}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 rounded-lg p-6"
                >
                    <h3 className="text-lg font-medium text-white mb-4">
                        When do you need the ambulance?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setUrgency("immediate")}
                            className={`p-4 rounded-lg flex items-center cursor-pointer border-2 ${
                                urgency === "immediate"
                                    ? "border-red-500 bg-gray-700"
                                    : "border-gray-700"
                            }`}
                        >
                            <div className="bg-red-500/20 p-3 rounded-full text-red-500">
                                <Ri24HoursFill className="text-xl" />
                            </div>
                            <div className="ml-4">
                                <h4 className="font-medium text-white">
                                    Immediate (ASAP)
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Send ambulance to my location right away
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setUrgency("scheduled")}
                            className={`p-4 rounded-lg flex items-center cursor-pointer border-2 ${
                                urgency === "scheduled"
                                    ? "border-red-500 bg-gray-700"
                                    : "border-gray-700"
                            }`}
                        >
                            <div className="bg-red-500/20 p-3 rounded-full text-red-500">
                                <RiCalendarLine className="text-xl" />
                            </div>
                            <div className="ml-4">
                                <h4 className="font-medium text-white">
                                    Schedule for Later
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Book for a specific date and time
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {urgency === "scheduled" && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={dateTime.date}
                                    onChange={(e) =>
                                        setDateTime({
                                            ...dateTime,
                                            date: e.target.value,
                                        })
                                    }
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Time
                                </label>
                                <input
                                    type="time"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={dateTime.time}
                                    onChange={(e) =>
                                        setDateTime({
                                            ...dateTime,
                                            time: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        );
    };

    const renderLocationStep = () => {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 rounded-lg p-6"
                >
                    <div className="flex items-center mb-4">
                        <RiMapPinLine className="text-red-500 mr-2" />
                        <h3 className="text-lg font-medium text-white">
                            Pickup Location
                        </h3>
                    </div>

                    <div className="relative mb-4">
                        <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                            <span className="pl-3 text-gray-400">
                                <RiMapPinLine />
                            </span>
                            <input
                                type="text"
                                placeholder="Enter pickup address"
                                className="flex-1 bg-gray-700 px-3 py-3 text-white focus:outline-none"
                                value={locations.pickup}
                                onChange={(e) => {
                                    setLocations({
                                        ...locations,
                                        pickup: e.target.value,
                                    });
                                    setShowLocationSuggestions(true);
                                }}
                            />
                            {locations.pickup && (
                                <button
                                    className="px-3 text-gray-400 hover:text-white"
                                    onClick={() => {
                                        setLocations({
                                            ...locations,
                                            pickup: "",
                                        });
                                        setShowLocationSuggestions(false);
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {showLocationSuggestions && (
                            <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-y-auto">
                                <div className="p-2">
                                    <h4 className="text-xs font-medium text-gray-400 uppercase px-2 py-1">
                                        Saved Locations
                                    </h4>
                                    {savedLocations.length > 0 ? (
                                        savedLocations.map((location) => (
                                            <div
                                                key={location.id}
                                                className="px-3 py-2 hover:bg-gray-700 rounded cursor-pointer flex items-center"
                                                onClick={() =>
                                                    handleLocationSelect(
                                                        location,
                                                        "pickup"
                                                    )
                                                }
                                            >
                                                <span className="text-red-500 mr-2">
                                                    {location.type ===
                                                    "home" ? (
                                                        <RiHomeHeartLine />
                                                    ) : location.type ===
                                                      "work" ? (
                                                        <RiUserLine />
                                                    ) : (
                                                        <RiContactsLine />
                                                    )}
                                                </span>
                                                <div>
                                                    <p className="text-white text-sm font-medium">
                                                        {location.name}
                                                    </p>
                                                    <p className="text-gray-400 text-xs">
                                                        {location.address}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400 px-3 py-2">
                                            No saved locations
                                        </p>
                                    )}

                                    <hr className="border-gray-700 my-2" />

                                    <div className="px-3 py-2 hover:bg-gray-700 rounded cursor-pointer flex items-center">
                                        <span className="text-blue-500 mr-2">
                                            <RiMapPinTimeLine />
                                        </span>
                                        <p className="text-blue-400 text-sm">
                                            Use current location
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center mb-4 mt-6">
                        <RiHospitalLine className="text-red-500 mr-2" />
                        <h3 className="text-lg font-medium text-white">
                            Destination
                        </h3>
                    </div>

                    <div className="relative">
                        <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                            <span className="pl-3 text-gray-400">
                                <RiMapPinLine />
                            </span>
                            <input
                                type="text"
                                placeholder="Enter destination (hospital, clinic, etc.)"
                                className="flex-1 bg-gray-700 px-3 py-3 text-white focus:outline-none"
                                value={locations.dropoff}
                                onChange={(e) => {
                                    setLocations({
                                        ...locations,
                                        dropoff: e.target.value,
                                    });
                                    setShowHospitalSuggestions(true);
                                }}
                            />
                            {locations.dropoff && (
                                <button
                                    className="px-3 text-gray-400 hover:text-white"
                                    onClick={() => {
                                        setLocations({
                                            ...locations,
                                            dropoff: "",
                                        });
                                        setShowHospitalSuggestions(false);
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {showHospitalSuggestions && (
                            <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-y-auto">
                                <div className="p-2">
                                    <h4 className="text-xs font-medium text-gray-400 uppercase px-2 py-1">
                                        Nearby Hospitals
                                    </h4>
                                    {HospitalSuggestions.map((hospital) => (
                                        <div
                                            key={hospital.id}
                                            className="px-3 py-2 hover:bg-gray-700 rounded cursor-pointer flex items-center justify-between"
                                            onClick={() =>
                                                handleLocationSelect(
                                                    hospital,
                                                    "dropoff"
                                                )
                                            }
                                        >
                                            <div className="flex items-center">
                                                <span className="text-red-500 mr-2">
                                                    <RiHospitalLine />
                                                </span>
                                                <div>
                                                    <p className="text-white text-sm font-medium">
                                                        {hospital.name}
                                                    </p>
                                                    <p className="text-gray-400 text-xs">
                                                        {hospital.address}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {hospital.distance}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 rounded-lg p-6"
                >
                    <div className="flex items-start space-x-2">
                        <RiInformationLine className="text-yellow-500 text-lg mt-0.5" />
                        <div>
                            <p className="text-white text-sm">
                                Distance will be calculated based on the pickup
                                and destination locations.
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Final fare may vary based on actual travel
                                distance and waiting time.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    const renderPatientInfoStep = () => {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 rounded-lg p-6"
                >
                    <div className="flex items-center mb-4">
                        <RiUserHeartLine className="text-red-500 mr-2" />
                        <h3 className="text-lg font-medium text-white">
                            {bookingType === "self"
                                ? "Your Information"
                                : "Patient Information"}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={patientInfo.name}
                                onChange={handlePatientInfoChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter phone number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={patientInfo.phone}
                                onChange={handlePatientInfoChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                placeholder="Enter age"
                                min="0"
                                max="120"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={patientInfo.age}
                                onChange={handlePatientInfoChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Gender
                            </label>
                            <select
                                name="gender"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={patientInfo.gender}
                                onChange={handlePatientInfoChange}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 rounded-lg p-6"
                >
                    <div className="flex items-center mb-4">
                        <RiFileListLine className="text-red-500 mr-2" />
                        <h3 className="text-lg font-medium text-white">
                            Medical Information
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Medical Condition (Optional)
                            </label>
                            <select
                                name="medicalCondition"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={patientInfo.medicalCondition}
                                onChange={handlePatientInfoChange}
                            >
                                <option value="">
                                    Select condition (if applicable)
                                </option>
                                <option value="cardiac">Cardiac Problem</option>
                                <option value="respiratory">
                                    Respiratory Distress
                                </option>
                                <option value="trauma">Trauma/Injury</option>
                                <option value="pregnancy">
                                    Pregnancy Related
                                </option>
                                <option value="dialysis">
                                    Dialysis Patient
                                </option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                name="additionalNotes"
                                placeholder="Any special requirements or information for the ambulance crew"
                                rows="3"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={patientInfo.additionalNotes}
                                onChange={handlePatientInfoChange}
                            ></textarea>
                        </div>
                    </div>
                </motion.div>

                {bookingType === "other" && (
                    <motion.div
                        variants={itemVariants}
                        className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-6"
                    >
                        <div className="flex items-start space-x-3">
                            <RiInformationLine className="text-yellow-500 text-lg mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-white text-sm font-medium">
                                    Booking for someone else?
                                </p>
                                <p className="text-gray-300 text-sm mt-1">
                                    You'll receive bookin You'll receive booking
                                    updates and will be responsible for
                                    coordinating with the ambulance service if
                                    needed. Make sure you're available during
                                    the booking time.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        );
    };

    const renderConfirmationStep = () => {
        // Find selected ambulance type
        const selectedAmbulance = ambulanceTypes.find(
            (type) => type.id === ambulanceType
        );

        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 rounded-lg p-6"
                >
                    <h3 className="text-lg font-medium text-white mb-4">
                        Review your booking
                    </h3>

                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                                <h4 className="text-gray-400 text-xs uppercase font-medium mb-2">
                                    Ambulance Type
                                </h4>
                                <div className="flex items-center text-white">
                                    <div className="bg-red-500/20 p-2 rounded-full text-red-500 mr-3">
                                        {selectedAmbulance?.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {selectedAmbulance?.name}
                                        </p>
                                        <p className="text-red-500 text-sm">
                                            {selectedAmbulance?.price}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-700/50 p-4 rounded-lg">
                                <h4 className="text-gray-400 text-xs uppercase font-medium mb-2">
                                    Time
                                </h4>
                                <div className="flex text-white">
                                    {urgency === "immediate" ? (
                                        <>
                                            <Ri24HoursFill className="text-red-500 mr-3 mt-0.5" />
                                            <p className="font-medium">
                                                Immediate (ASAP)
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <RiCalendarLine className="text-red-500 mr-3 mt-0.5" />
                                            <div>
                                                <p className="font-medium">
                                                    Scheduled
                                                </p>
                                                <p className="text-sm text-gray-300">
                                                    {dateTime.date
                                                        ? new Date(
                                                              dateTime.date
                                                          ).toLocaleDateString(
                                                              "en-US",
                                                              {
                                                                  weekday:
                                                                      "long",
                                                                  year: "numeric",
                                                                  month: "long",
                                                                  day: "numeric",
                                                              }
                                                          )
                                                        : "Date not selected"}
                                                    {dateTime.time
                                                        ? ` at ${dateTime.time}`
                                                        : ""}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700/50 p-4 rounded-lg">
                            <h4 className="text-gray-400 text-xs uppercase font-medium mb-2">
                                Trip Details
                            </h4>
                            <div className="space-y-3">
                                <div className="flex">
                                    <div className="flex flex-col items-center mr-3">
                                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                                            <RiMapPinLine className="text-white" />
                                        </div>
                                        <div className="w-0.5 h-10 bg-gray-600 my-1"></div>
                                        <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center">
                                            <RiHospitalLine className="text-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="mb-3">
                                            <p className="text-gray-400 text-xs">
                                                Pickup Location
                                            </p>
                                            <p className="text-white">
                                                {locations.pickup ||
                                                    "Not specified"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">
                                                Destination
                                            </p>
                                            <p className="text-white">
                                                {locations.dropoff ||
                                                    "Not specified"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700/50 p-4 rounded-lg">
                            <h4 className="text-gray-400 text-xs uppercase font-medium mb-2">
                                Patient Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400 text-xs">
                                        Full Name
                                    </p>
                                    <p className="text-white">
                                        {patientInfo.name || "Not specified"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">
                                        Phone Number
                                    </p>
                                    <p className="text-white">
                                        {patientInfo.phone || "Not specified"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Age</p>
                                    <p className="text-white">
                                        {patientInfo.age || "Not specified"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">
                                        Gender
                                    </p>
                                    <p className="text-white">
                                        {patientInfo.gender
                                            ? patientInfo.gender
                                                  .charAt(0)
                                                  .toUpperCase() +
                                              patientInfo.gender.slice(1)
                                            : "Not specified"}
                                    </p>
                                </div>
                            </div>

                            {(patientInfo.medicalCondition ||
                                patientInfo.additionalNotes) && (
                                <div className="mt-4 border-t border-gray-600 pt-4">
                                    {patientInfo.medicalCondition && (
                                        <div className="mb-2">
                                            <p className="text-gray-400 text-xs">
                                                Medical Condition
                                            </p>
                                            <p className="text-white">
                                                {patientInfo.medicalCondition
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    patientInfo.medicalCondition.slice(
                                                        1
                                                    )}
                                            </p>
                                        </div>
                                    )}

                                    {patientInfo.additionalNotes && (
                                        <div>
                                            <p className="text-gray-400 text-xs">
                                                Additional Notes
                                            </p>
                                            <p className="text-white">
                                                {patientInfo.additionalNotes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-700/50 p-4 rounded-lg">
                            <h4 className="text-gray-400 text-xs uppercase font-medium mb-2">
                                Payment Information
                            </h4>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <RiMoneyDollarCircleLine className="text-green-500 mr-2" />
                                    <p className="text-white">
                                        Pay after service (cash/card)
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">
                                        Estimated Fare
                                    </p>
                                    <p className="text-white font-medium">
                                        {selectedAmbulance?.price}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-400">
                                <p>
                                    Final fare may vary based on actual distance
                                    traveled and waiting time.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="bg-gray-900 p-4 rounded-lg">
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mr-3 mt-1"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm text-gray-300"
                                >
                                    I confirm that all provided information is
                                    accurate. I understand and agree to the
                                    <a
                                        href="#"
                                        className="text-red-500 hover:underline"
                                    >
                                        {" "}
                                        terms of service
                                    </a>{" "}
                                    and
                                    <a
                                        href="#"
                                        className="text-red-500 hover:underline"
                                    >
                                        {" "}
                                        cancellation policy
                                    </a>
                                    .
                                </label>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    const renderBookingConfirmed = () => {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
            >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-10 h-10 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                    Booking Confirmed!
                </h2>
                <p className="text-gray-400 mb-6">
                    Your ambulance booking has been confirmed successfully.
                </p>

                <div className="bg-gray-800 rounded-lg p-6 mb-8 max-w-md mx-auto">
                    <p className="text-gray-400 text-sm mb-2">Booking ID</p>
                    <p className="text-xl font-mono font-bold text-white mb-4">
                        {bookingId}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div>
                            <p className="text-gray-400 text-xs">
                                Ambulance Type
                            </p>
                            <p className="text-white">
                                {ambulanceTypes.find(
                                    (type) => type.id === ambulanceType
                                )?.name || "Not specified"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs">Status</p>
                            <p className="text-green-500 font-medium">
                                Confirmed
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs">Time</p>
                            <p className="text-white">
                                {urgency === "immediate"
                                    ? "ASAP"
                                    : dateTime.date
                                      ? `${new Date(dateTime.date).toLocaleDateString()} ${dateTime.time}`
                                      : "Not specified"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs">Patient</p>
                            <p className="text-white">{patientInfo.name}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 max-w-md mx-auto">
                    <Link
                        to={`/`}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
                    >
                        <RiPhoneLine className="mr-2" />
                        Contact Ambulance Driver
                    </Link>

                    <Link
                        to={`/history`}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
                    >
                        <RiFileListLine className="mr-2" />
                        View Booking Details
                    </Link>

                    <Link
                        to={`/`}
                        className="text-gray-400 hover:text-white font-medium py-2 flex items-center justify-center"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="bg-gray-900 text-white p-4 md:p-8">
            <div className="mx-auto pt-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Book an Ambulance
                </h1>
                <p className="text-gray-400 mb-6">
                    Fill in the details below to book an ambulance service
                </p>

                {!bookingConfirmed ? (
                    <>
                        {renderStepIndicator()}

                        {step === 1 && renderServiceTypeStep()}
                        {step === 2 && renderLocationStep()}
                        {step === 3 && renderPatientInfoStep()}
                        {step === 4 && renderConfirmationStep()}

                        <div className="mt-8 flex justify-between">
                            {step > 1 && (
                                <button
                                    onClick={handlePrevStep}
                                    className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
                                >
                                    <RiArrowLeftLine className="mr-2" />
                                    Back
                                </button>
                            )}
                            {step === 1 && <div></div>}

                            <button
                                onClick={handleNextStep}
                                disabled={isSubmitting}
                                className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                                    step < 4
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-green-600 hover:bg-green-700"
                                } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isSubmitting ? (
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
                                ) : null}

                                {step < 4 ? (
                                    <>
                                        Next
                                        <RiArrowRightLine className="ml-2" />
                                    </>
                                ) : isSubmitting ? (
                                    "Processing..."
                                ) : (
                                    <>
                                        Confirm Booking
                                        <RiShieldCheckLine className="ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    renderBookingConfirmed()
                )}
            </div>
        </div>
    );
};

export default BookAmbulance;
