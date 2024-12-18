import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import db from '../db/db.js';

const authRoutes = express.Router();

authRoutes.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({ message: "Successfully logged in" });
});

authRoutes.post("/register", async (req, res) => {
    try {
        const { name, surname, email, password, type, teamName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query("SELECT * FROM teams WHERE name = $1", [String(teamName)]);
        const team = result.rows[0];

        await db.query(
            "INSERT INTO users (email, password, name, surname, team_id, type) VALUES ($1, $2, $3, $4, $5, $6)",
            [email, hashedPassword, name, surname, team.id, type.toLowerCase()]
        );
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

authRoutes.post("/logout", (req, res) => {
    req.logout(error => {
        if (error) return res.status(500).json({ error: "Failed to log out" });
        res.status(200).json({ message: "Successfully logged out" });
    });
});

authRoutes.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"], })
);

// Handle callback after Google authentication
authRoutes.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    if (req.user) {
        res.redirect("http://localhost:3000");
    } else {
        res.redirect("http://localhost:3000/login");
    }
});

authRoutes.get("/auth/check-auth", ensureAuthenticated,  (req, res) => {
    res.status(200).json({
        isLoggedIn: true,
        user: req.user
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next() };
    res.status(401).json({ loggedIn: false, message: "User not authenticated" });
}

export default authRoutes;