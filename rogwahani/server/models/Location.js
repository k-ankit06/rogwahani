const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: [true, "Location name is required"],
            trim: true,
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
        },
        type: {
            type: String,
            enum: ["home", "work", "hospital", "family", "other"],
            default: "home",
        },
        notes: {
            type: String,
            trim: true,
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
        coordinates: {
            lat: {
                type: Number,
                default: null,
            },
            lng: {
                type: Number,
                default: null,
            },
        },
    },
    { timestamps: true }
);

locationSchema.index({ user: 1, name: 1 });

// Only allow one default location per user
locationSchema.pre("save", async function (next) {
    if (this.isDefault) {
        await this.constructor.updateMany(
            { user: this.user, _id: { $ne: this._id }, isDefault: true },
            { $set: { isDefault: false } }
        );
    }
    next();
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
