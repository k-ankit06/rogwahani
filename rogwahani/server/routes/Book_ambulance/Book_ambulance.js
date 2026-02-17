const express = require("express");
const router = express.Router();
const auth = require("./../../middleware/auth");
const { check, validationResult } = require("express-validator");
const AmbulanceBooking = require("../../models/AmbulanceBooking");

// Validation rules for booking
const bookingValidationRules = [
    check("bookingType")
        .isIn(["self", "other"])
        .withMessage("Invalid booking type"),
    check("ambulanceType").notEmpty().withMessage("Ambulance type is required"),
    check("urgency")
        .isIn(["immediate", "scheduled"])
        .withMessage("Invalid urgency type"),
    check("dateTime.date")
        .if(check("urgency").equals("scheduled"))
        .notEmpty()
        .withMessage("Date is required for scheduled bookings"),
    check("dateTime.time")
        .if(check("urgency").equals("scheduled"))
        .notEmpty()
        .withMessage("Time is required for scheduled bookings"),
    check("locations.pickup")
        .notEmpty()
        .withMessage("Pickup location is required"),
    check("locations.dropoff")
        .notEmpty()
        .withMessage("Dropoff location is required"),
    check("patientInfo.name")
        .notEmpty()
        .withMessage("Patient name is required"),
    check("patientInfo.phone")
        .isMobilePhone()
        .withMessage("Invalid phone number format"),
];

router.post("/", auth, bookingValidationRules, async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newBooking = new AmbulanceBooking({
            user: req.id,
            ...req.body,
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// Get user bookings
router.get("/", auth, async (req, res) => {
    try {
        const bookings = await AmbulanceBooking.find({ user: req.id }).sort({
            createdAt: -1,
        });
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

// Cancel booking
router.put("/:id/cancel", auth, async (req, res) => {
    try {
        const booking = await AmbulanceBooking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        if (booking.user.toString() !== req.id) {
            return res.status(403).json({ msg: "Unauthorized" });
        }

        booking.status = "cancelled";
        await booking.save();

        res.json({ msg: "Booking cancelled" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
