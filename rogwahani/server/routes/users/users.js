const express = require("express");
const router = express.Router();
const User = require("./../../models/User");

const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, picture } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            picture,
            email_verified: false,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                picture: user.picture,
                email_verified: user.email_verified,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
            user.picture = req.body.picture || user.picture;
            user.email_verified =
                req.body.email_verified !== undefined
                    ? req.body.email_verified
                    : user.email_verified;
            user.isDisabled =
                req.body.isDisabled !== undefined
                    ? req.body.isDisabled
                    : user.isDisabled;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                picture: updatedUser.picture,
                email_verified: updatedUser.email_verified,
                isDisabled: updatedUser.isDisabled,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await User.deleteOne({ _id: user._id });
            res.json({ message: "User removed" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
const toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.isDisabled = !user.isDisabled;
            await user.save();
            res.json({
                _id: user._id,
                isDisabled: user.isDisabled,
                message: `User ${user.isDisabled ? "disabled" : "enabled"} successfully`,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const changeUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!role || !["user", "admin", "driver"].includes(role)) {
            return res.status(400).json({ message: "Invalid role provided" });
        }

        const user = await User.findById(req.params.id);

        if (user) {
            user.role = role;
            await user.save();
            res.json({
                _id: user._id,
                role: user.role,
                message: `User role changed to ${role} successfully`,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getLatestUsers = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const latestUsers = await User.find()
            .select("-password")
            .sort({ createdAt: -1 })
            .limit(Number(limit));

        res.json(latestUsers);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const { check } = require("express-validator");

// Admin routes for user management
router
    .route("/")
    .get(getUsers)
    .post(
        [
            check("name", "Name is required").not().isEmpty(),
            check("email", "Please include a valid email").isEmail(),
            check(
                "password",
                "Password must be at least 6 characters"
            ).isLength({ min: 6 }),
        ],
        createUser
    );

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:id/toggle-status").patch(toggleUserStatus);

router.route("/:id/role").patch(changeUserRole);

router.route("/latest/:limit").get(getLatestUsers);

module.exports = router;
