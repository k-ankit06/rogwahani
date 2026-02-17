const mongoose = require("mongoose");

const AmbulanceBookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookingType: {
        type: String,
        enum: ["self", "other"],
        required: true,
    },
    patientInfo: {
        name: String,
        age: Number,
        gender: String,
        phone: String,
        medicalCondition: String,
        additionalNotes: String,
    },
    ambulanceType: {
        type: String,
        required: true,
    },
    urgency: {
        type: String,
        enum: ["immediate", "scheduled"],
        required: true,
    },
    dateTime: {
        date: String,
        time: String,
    },
    locations: {
        pickup: String,
        dropoff: String,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AmbulanceBooking = mongoose.model(
    "AmbulanceBooking",
    AmbulanceBookingSchema
);
module.exports = AmbulanceBooking;
