require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ CORS configuration — allow deployed frontend + localhost
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    process.env.FRONTEND_URL, // Set this to your Vercel URL after deploying
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Health check endpoint (for Render)
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "RogWahani API is running 🚀" });
});

app.use("/api/users", require("./routes/users/users"));
app.use("/api/auth", require("./routes/auth/auth"));
app.use(
    "/api/emergency-contacts",
    require("./routes/EmergencyContact/EmergencyContact")
);
const savedLocationsRoutes = require("./routes/SavedLocations/SavedLocations");
app.use("/api/locations", savedLocationsRoutes);
app.use("/api/bookings", require("./routes/Book_ambulance/Book_ambulance"));
app.use("/api/hospitals", require("./routes/Hospital/Hospital"));

// ✅ Start Server
const PORT = process.env.PORT || 5000;

const swaggerDocs = require("./config/swaggerConfig");
// Setup Swagger
swaggerDocs(app);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

