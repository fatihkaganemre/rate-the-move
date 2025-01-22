import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { db } from '../db/db.js';

export const authenticationRoutes = express.Router();

authenticationRoutes.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({ message: "Successfully logged in" });
});

authenticationRoutes.post("/register", async (req, res) => {
    try {
        const { name, surname, email, type, teamName } = req.body;
        const password = req.body.password || "thirdPartyLogin";
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query("SELECT * FROM teams WHERE name = $1", [String(teamName)]);
        const team = result.rows[0];
        const level = type.toLowerCase() === "competitor" ? 0 : null

        await db.query(
            "INSERT INTO users (email, password, name, surname, team_id, type, level) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [email, hashedPassword, name, surname, team.id, type.toLowerCase(), level]
        );

        // Retrieve the newly registered user
        const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        console.log(req.body.password === null);
        const user = { ...userResult.rows[0], isThirdPartyLogin: req.body.password === null};

        if (!result.rows[0]) {
            return res.status(500).json({ error: "Failed to retrieve user after registration" });
        }

        // Log the user in
        req.login(user, (error) => {
            if (error) {
                return res.status(500).json({ error: "Login failed after registration" });
            }
            res.status(201).json({ message: "Registration successful" });
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

authenticationRoutes.post("/logout", (req, res) => {
    req.logout(error => {
        if (error) return res.status(500).json({ error: "Failed to log out" });
        res.status(200).json({ message: "Successfully logged out" });
    });
});

authenticationRoutes.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"], })
);

// Handle callback after Google authentication
authenticationRoutes.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    if (req.user.isThirdPartyLogin) {
        res.redirect(`${process.env.WEBAPP_URL}/register`);
    } else {
        req.login(req.user, (err) => {
            if (err) return res.status(500).json({ error: "Login failed" });
            res.redirect(`${process.env.WEBAPP_URL}`);
        });
    }
});

authenticationRoutes.get("/auth/check-auth", ensureAuthenticated,  (req, res) => {
    res.status(200).json({
        isLoggedIn: req.user.id && true ,
        user: req.user
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next() };
    res.status(401).json({ isLoggedIn: false, message: "User not authenticated" });
}