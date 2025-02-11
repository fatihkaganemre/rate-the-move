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
 * Upload a video to Cloudinary.
 * @param {Buffer} fileBuffer - The video file buffer.
 * @returns {Promise<string>} - The Cloudinary video URL.
 */
export const uploadVideoToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "video", folder: "user_videos" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(fileBuffer);
    });
};
