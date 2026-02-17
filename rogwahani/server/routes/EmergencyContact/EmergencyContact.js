const express = require("express");
const router = express.Router();
const EmergencyContact = require("../../models/EmergencyContact");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route   GET /api/users/emergency-contacts
// @desc    Get all emergency contacts for a user
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        // Find all emergency contacts for the current user
        console.log(req.header("x-auth-token"));
        console.log(req.header);
        const contacts = await EmergencyContact.find({ user: req.id }).sort({
            isPrimary: -1,
            createdAt: -1,
        });

        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST /api/users/emergency-contacts
// @desc    Create a new emergency contact
// @access  Private
router.post(
    "/",
    [
        auth,
        [
            check("name", "Name is required").not().isEmpty(),
            check("phone", "Phone number is required").not().isEmpty(),
            check("relationship", "Relationship must be valid").isIn([
                "family",
                "friend",
                "doctor",
                "hospital",
                "colleague",
                "other",
            ]),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, phone, relationship, notes } = req.body;

            // Check if any contacts exist for this user
            const existingContacts = await EmergencyContact.find({
                user: req.id,
            });
            const isPrimary = existingContacts.length === 0;

            // Create new contact
            const newContact = new EmergencyContact({
                user: req.id,
                name,
                phone,
                relationship,
                notes,
                isPrimary,
            });

            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route   PUT /api/users/emergency-contacts/:id
// @desc    Update an emergency contact
// @access  Private
router.put(
    "/:id",
    [
        auth,
        [
            check("name", "Name is required").optional().not().isEmpty(),
            check("phone", "Phone number is required")
                .optional()
                .not()
                .isEmpty(),
            check("relationship", "Relationship must be valid")
                .optional()
                .isIn([
                    "family",
                    "friend",
                    "doctor",
                    "hospital",
                    "colleague",
                    "other",
                ]),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Get the contact with the provided ID and owned by current user
            let contact = await EmergencyContact.findOne({
                _id: req.params.id,
                user: req.id,
            });

            if (!contact) {
                return res
                    .status(404)
                    .json({ msg: "Contact not found or not authorized" });
            }

            // Update contact fields
            const { name, phone, relationship, notes } = req.body;

            if (name) contact.name = name;
            if (phone) contact.phone = phone;
            if (relationship) contact.relationship = relationship;
            if (notes !== undefined) contact.notes = notes;

            await contact.save();
            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route   PUT /api/users/emergency-contacts/primary/:id
// @desc    Set a contact as primary
// @access  Private
router.put("/primary/:id", auth, async (req, res) => {
    try {
        // Find contact to set as primary
        const contactToSetPrimary = await EmergencyContact.findOne({
            _id: req.params.id,
            user: req.id,
        });

        if (!contactToSetPrimary) {
            return res
                .status(404)
                .json({ msg: "Contact not found or not authorized" });
        }

        // First, set all contacts for this user to not primary
        await EmergencyContact.updateMany(
            { user: req.id },
            { $set: { isPrimary: false } }
        );

        // Then set the selected contact as primary
        contactToSetPrimary.isPrimary = true;
        await contactToSetPrimary.save();

        // Get all updated contacts
        const contacts = await EmergencyContact.find({ user: req.id }).sort({
            isPrimary: -1,
            createdAt: -1,
        });

        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   DELETE /api/users/emergency-contacts/:id
// @desc    Delete an emergency contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
    try {
        // Find contact by ID and owned by current user
        const contact = await EmergencyContact.findOne({
            _id: req.params.id,
            user: req.id,
        });

        if (!contact) {
            return res
                .status(404)
                .json({ msg: "Contact not found or not authorized" });
        }

        // Check if the contact being deleted is primary
        const wasPrimary = contact.isPrimary;

        // Delete the contact
        await EmergencyContact.deleteOne({ _id: req.params.id });

        // If deleted contact was primary, set a new primary if any contacts remain
        if (wasPrimary) {
            const remainingContacts = await EmergencyContact.find({
                user: req.id,
            }).sort({ createdAt: 1 });

            if (remainingContacts.length > 0) {
                remainingContacts[0].isPrimary = true;
                await remainingContacts[0].save();
            }
        }

        res.json({ msg: "Contact removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
