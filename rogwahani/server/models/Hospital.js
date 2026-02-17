// models/Hospital.js
const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Hospital name is required"],
            trim: true,
        },
        distance: {
            type: Number,
            required: [true, "Distance is required"],
        },
        time: {
            type: Number,
            required: [true, "Travel time is required"],
        },
        type: {
            type: String,
            required: [true, "Hospital type is required"],
            trim: true,
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        emergency: {
            type: Boolean,
            default: false,
        },
        beds: {
            type: Number,
            default: 0,
        },
        ambulanceReady: {
            type: Boolean,
            default: false,
        },
        specialties: {
            type: [String],
            default: [],
        },
        imageUrl: {
            type: String,
            default: "/api/placeholder/400/200",
        },
        website: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
