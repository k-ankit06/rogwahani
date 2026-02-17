const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

// Upload to Cloudinary
const uploadToCloudinary = async (imagePath, options = {}) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "upload", // Folder in Cloudinary
            public_id: path.basename(imagePath), // Filename in Cloudinary
            resource_type: "image",
        });
        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading to Cloudinary: ${error.message}`);
    }
};

// Main function to process image
const processAndUploadImage = async (imagePath, options = {}) => {
    try {
        // Ensure the file exists
        if (!fs.existsSync(imagePath)) {
            throw new Error(`File not found at path: ${imagePath}`);
        }

        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(imagePath, options);

        // Clean up the temporary file
        fs.unlinkSync(imagePath);

        return {
            success: true,
            url: cloudinaryUrl,
        };
    } catch (error) {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        throw error;
    }
};

module.exports = {
    processAndUploadImage,
};
