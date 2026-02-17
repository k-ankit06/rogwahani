// routes/nearby-hospital.js
const express = require("express");
const router = express.Router();
const Hospital = require("../../models/Hospital");

router.get("/", async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        res.json(hospital);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const hospital = new Hospital(req.body);
        const newHospital = await hospital.save();
        res.status(201).json(newHospital);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedHospital);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        await Hospital.findByIdAndDelete(req.params.id);
        res.json({ message: "Hospital removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/search/filters", async (req, res) => {
    try {
        const { type, emergency, maxDistance, minRating, specialty } =
            req.query;

        const queryObj = {};

        if (type) queryObj.type = type;
        if (emergency) queryObj.emergency = emergency === "true";
        if (maxDistance) queryObj.distance = { $lte: parseFloat(maxDistance) };
        if (minRating) queryObj.rating = { $gte: parseFloat(minRating) };
        if (specialty) queryObj.specialties = { $in: [specialty] };

        const hospitals = await Hospital.find(queryObj);
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
