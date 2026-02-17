const express = require("express");
const router = express.Router();
const Location = require("./../../models/Location");
const auth = require("../../middleware/auth");

// Assuming this is the path to your auth middleware

// =============== HELPER FUNCTIONS ===============
/**
 * Responds with error and appropriate status code
 */
const errorHandler = (res, error, statusCode = 500) => {
    console.error("Error:", error.message);
    const message = statusCode === 500 ? "Server error" : error.message;
    return res.status(statusCode).json({ success: false, message });
};

/**
 * Checks if user has reached max locations limit
 */
const checkLocationLimit = async (userId) => {
    const MAX_LOCATIONS = 10; // Adjust as needed
    const count = await Location.countDocuments({ user: userId });
    return count >= MAX_LOCATIONS;
};

/**
 * Sets a location as default and unsets any existing default
 */
const setLocationAsDefault = async (userId, locationId) => {
    // First, unset any existing default
    await Location.updateMany(
        { user: userId, isDefault: true },
        { $set: { isDefault: false } }
    );

    // Then set the new default
    await Location.findOneAndUpdate(
        { _id: locationId, user: userId },
        { $set: { isDefault: true } },
        { new: true }
    );
};

// =============== ROUTE HANDLERS ===============
/**
 * @route   GET /api/locations
 * @desc    Get all locations for a user
 * @access  Private
 */
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find({ user: req.id })
            .sort({ isDefault: -1, createdAt: -1 })
            .select("-__v");

        return res.json({
            success: true,
            count: locations.length,
            data: locations,
        });
    } catch (error) {
        return errorHandler(res, error);
    }
};

/**
 * @route   GET /api/locations/:id
 * @desc    Get location by ID
 * @access  Private
 */
const getLocationById = async (req, res) => {
    try {
        const location = await Location.findOne({
            _id: req.params.id,
            user: req.id,
        }).select("-__v");

        if (!location) {
            return errorHandler(res, new Error("Location not found"), 404);
        }

        return res.json({ success: true, data: location });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return errorHandler(res, new Error("Invalid location ID"), 400);
        }
        return errorHandler(res, error);
    }
};

/**
 * @route   POST /api/locations
 * @desc    Create a new location
 * @access  Private
 */
const createLocation = async (req, res) => {
    try {
        // Check if max locations limit reached
        const limitReached = await checkLocationLimit(req.id);
        if (limitReached) {
            return errorHandler(
                res,
                new Error("Maximum locations limit reached"),
                400
            );
        }

        const { name, address, type, notes, isDefault = false } = req.body;

        // Basic validation
        if (!name || !address) {
            return errorHandler(
                res,
                new Error("Name and address are required"),
                400
            );
        }

        // Check for duplicate names
        const existingLocation = await Location.findOne({
            user: req.id,
            name: { $regex: new RegExp(`^${name}$`, "i") }, // Case insensitive match
        });

        if (existingLocation) {
            return errorHandler(
                res,
                new Error("A location with this name already exists"),
                400
            );
        }

        // If this is the first location or isDefault is true, set as default
        let setAsDefault = isDefault;
        if (!setAsDefault) {
            const locationCount = await Location.countDocuments({
                user: req.id,
            });
            setAsDefault = locationCount === 0;
        }

        // Create new location
        const newLocation = new Location({
            user: req.id,
            name,
            address,
            type: type || "home",
            notes: notes || "",
            isDefault: setAsDefault,
        });

        const savedLocation = await newLocation.save();
        return res.status(201).json({ success: true, data: savedLocation });
    } catch (error) {
        return errorHandler(res, error);
    }
};

/**
 * @route   PUT /api/locations/:id
 * @desc    Update a location
 * @access  Private
 */
const updateLocation = async (req, res) => {
    try {
        const { name, address, type, notes, isDefault } = req.body;

        // Find the location
        let location = await Location.findOne({
            _id: req.params.id,
            user: req.id,
        });

        if (!location) {
            return errorHandler(res, new Error("Location not found"), 404);
        }

        // Check if name is being changed and if the new name already exists
        if (name && name !== location.name) {
            const existingLocation = await Location.findOne({
                user: req.id,
                name: { $regex: new RegExp(`^${name}$`, "i") },
                _id: { $ne: req.params.id },
            });

            if (existingLocation) {
                return errorHandler(
                    res,
                    new Error("A location with this name already exists"),
                    400
                );
            }
        }

        // Update fields
        if (name) location.name = name;
        if (address) location.address = address;
        if (type) location.type = type;
        if (notes !== undefined) location.notes = notes;

        // Handle default location setting separately to avoid race conditions
        if (isDefault !== undefined && isDefault !== location.isDefault) {
            if (isDefault) {
                await setLocationAsDefault(req.id, location._id);
                location.isDefault = true;
            } else {
                // If unsetting default, check if there are other locations
                const otherLocations = await Location.countDocuments({
                    user: req.id,
                    _id: { $ne: location._id },
                });

                if (otherLocations > 0) {
                    location.isDefault = false;
                } else {
                    // Can't unset default if it's the only location
                    return errorHandler(
                        res,
                        new Error(
                            "Cannot unset default on the only saved location"
                        ),
                        400
                    );
                }
            }
        }

        const updatedLocation = await location.save();
        return res.json({ success: true, data: updatedLocation });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return errorHandler(res, new Error("Invalid location ID"), 400);
        }
        return errorHandler(res, error);
    }
};

/**
 * @route   DELETE /api/locations/:id
 * @desc    Delete a location
 * @access  Private
 */
const deleteLocation = async (req, res) => {
    try {
        const location = await Location.findOne({
            _id: req.params.id,
            user: req.id,
        });

        if (!location) {
            return errorHandler(res, new Error("Location not found"), 404);
        }

        // If deleting default location, set another one as default
        if (location.isDefault) {
            const nextDefault = await Location.findOne({
                user: req.id,
                _id: { $ne: location._id },
            }).sort({ createdAt: -1 });

            if (nextDefault) {
                nextDefault.isDefault = true;
                await nextDefault.save();
            }
        }

        await Location.deleteOne({ _id: req.params.id });

        return res.json({
            success: true,
            message: "Location deleted successfully",
            data: { id: req.params.id },
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return errorHandler(res, new Error("Invalid location ID"), 400);
        }
        return errorHandler(res, error);
    }
};

/**
 * @route   PUT /api/locations/:id/set-default
 * @desc    Set a location as default
 * @access  Private
 */
const setDefaultLocation = async (req, res) => {
    try {
        const location = await Location.findOne({
            _id: req.params.id,
            user: req.id,
        });

        if (!location) {
            return errorHandler(res, new Error("Location not found"), 404);
        }

        if (location.isDefault) {
            return res.json({
                success: true,
                message: "This location is already set as default",
                data: location,
            });
        }

        await setLocationAsDefault(req.id, location._id);

        const updatedLocation = await Location.findById(location._id);
        return res.json({
            success: true,
            message: "Default location updated successfully",
            data: updatedLocation,
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return errorHandler(res, new Error("Invalid location ID"), 400);
        }
        return errorHandler(res, error);
    }
};

/**
 * @route   GET /api/locations/default
 * @desc    Get default location
 * @access  Private
 */
const getDefaultLocation = async (req, res) => {
    try {
        const location = await Location.findOne({
            user: req.id,
            isDefault: true,
        }).select("-__v");

        if (!location) {
            return res.json({
                success: true,
                message: "No default location set",
                data: null,
            });
        }

        return res.json({ success: true, data: location });
    } catch (error) {
        return errorHandler(res, error);
    }
};

/**
 * @route   GET /api/locations/search
 * @desc    Search locations by name or address
 * @access  Private
 */
const searchLocations = async (req, res) => {
    try {
        const { term } = req.query;

        if (!term) {
            return errorHandler(res, new Error("Search term is required"), 400);
        }

        const locations = await Location.find({
            user: req.id,
            $or: [
                { name: { $regex: term, $options: "i" } },
                { address: { $regex: term, $options: "i" } },
            ],
        })
            .sort({ isDefault: -1, name: 1 })
            .select("-__v");

        return res.json({
            success: true,
            count: locations.length,
            data: locations,
        });
    } catch (error) {
        return errorHandler(res, error);
    }
};

// =============== ROUTE DEFINITIONS ===============
// Apply auth middleware to all routes
router.use(auth);

// Get all locations
router.get("/", getAllLocations);

// Get default location
router.get("/default", getDefaultLocation);

// Search locations
router.get("/search", searchLocations);

// Get specific location
router.get("/:id", getLocationById);

// Create new location
router.post("/", createLocation);

// Update location
router.put("/:id", updateLocation);

// Delete location
router.delete("/:id", deleteLocation);

// Set location as default
router.put("/:id/set-default", setDefaultLocation);

module.exports = router;
