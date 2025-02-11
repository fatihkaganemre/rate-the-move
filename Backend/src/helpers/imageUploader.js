import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image to Cloudinary.
 * @param {Buffer} fileBuffer - The image file buffer.
 * @returns {Promise<string>} - The Cloudinary image URL.
 */
export const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
        }).end(fileBuffer);
    });
};
