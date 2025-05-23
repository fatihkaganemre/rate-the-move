import express from 'express';
import { db } from '../db/db.js';
import bcrypt from 'bcrypt';
import { uploadToCloudinary } from "../helpers/imageUploader.js";
import { uploadVideoToCloudinary } from '../helpers/videoUploader.js';
import multer from "multer";

export const accountRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
};

accountRoutes.delete("/account", isAuthenticated,  async (req, res) => {
    try {
        await db.query("DELETE FROM users WHERE id = $1", [req.user.id]);
        req.logout(error => {
            if (error) return res.status(500).json({ error: "Failed to log out" });
            res.status(200).json({ message: "Account is removed successfully!"});
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

accountRoutes.post("/account/email", isAuthenticated, async (req, res) => {
    try { 
        const email = req.body.email;
        await db.query("UPDATE users SET email=$1 WHERE id=$2", [email, req.user.id]);
        res.status(200).json({ message: "Email is updated successfully!" });
    } catch (error) {
        res.status(500).json({ error});
    }
});

accountRoutes.post("/account/password", isAuthenticated,  async (req, res) => {
    try { 
        const { oldPassword, newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: "New password must be at least 8 characters long." });
        }

        const result = await db.query("SELECT password FROM users WHERE id=$1", [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        const storedPasswordHash = result.rows[0].password;
        const isMatch = await bcrypt.compare(oldPassword, storedPasswordHash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid old password." });
        }

        const isSamePassword = await bcrypt.compare(newPassword, storedPasswordHash);
        if (isSamePassword) {
            return res.status(400).json({ message: "New password cannot be the same as the old password." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query("UPDATE users SET password=$1 WHERE id=$2", [hashedPassword, req.user.id]);

        // Log the user out
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ message: "Password updated, but there was an error logging you out. Please log in again." });
            }

            res.status(200).json({ message: "Password updated successfully. Please log in again." });
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

accountRoutes.post("/upload-profile-image", upload.single("profileImage"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        const userId = req.user.id;
        //const imageUrl = await uploadToCloudinary(req.file.buffer);
        const imageUrl = "https://res.cloudinary.com/ddqfvccb3/image/upload/v1739190486/cld-sample.jpg";

        // Save URL to PostgreSQL
        await db.query("UPDATE users SET image_url = $1 WHERE id = $2", [imageUrl, userId]);

        res.json({ success: true, imageUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

accountRoutes.post("/upload-video", upload.single("videoFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No video uploaded" });
        }

        //const video_url = await uploadVideoToCloudinary(req.file.buffer);
        const video_url = "https://player.cloudinary.com/embed/?public_id=samples%2Felephants&cloud_name=ddqfvccb3&profile=cld-default";
        const date = new Date().toLocaleDateString();

        // Save video URL in PostgreSQL
        await db.query(
            "INSERT INTO moves (user_id, title, description, date, video_url) VALUES ($1, $2, $3, $4, $5)",
             [req.user.id, req.body.title, req.body.description, date, video_url]
        );

        res.json({ success: true, video_url });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error occured while uploading: ${error}` });
    }
});