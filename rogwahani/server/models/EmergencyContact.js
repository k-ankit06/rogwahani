const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencyContactSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        relationship: {
            type: String,
            enum: [
                "family",
                "friend",
                "doctor",
                "hospital",
                "colleague",
                "other",
            ],
            default: "family",
        },
        notes: {
            type: String,
        },
        isPrimary: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Index for faster queries
emergencyContactSchema.index({ user: 1 });

module.exports = mongoose.model("EmergencyContact", emergencyContactSchema);
