import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import bcrypt from "bcrypt";
import path, { dirname }  from "path";
import cors from "cors";
import env from "dotenv";
import { db } from './db/db.js';
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

import { competitorsRoutes } from "./api/competitors.js";
import { moviesRoutes } from "./api/movies.js";
import { ratingsRoutes } from "./api/ratings.js";
import { authenticationRoutes } from "./api/authentication.js";
import { accountRoutes } from "./api/account.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
env.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: process.env.WEBAPP_URL, // Replace with your front-end origin
    credentials: true, // Allows session cookies to be sent
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../Frontend/public")));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // Use true with HTTPS
            httpOnly: true,
            sameSite: "lax", // Adjust for production if needed
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(competitorsRoutes);
app.use(authenticationRoutes);
app.use(moviesRoutes);
app.use(ratingsRoutes);
app.use(accountRoutes);

// Passport Configuration
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
            if (result.rows.length === 0) return done(null, false, { message: "User not found" });
            const user = result.rows[0];
            const isValid = await bcrypt.compare(password, user.password);
            return isValid ? done(null, user) : done(null, false, { message: "Incorrect password" });
        } catch (error) {
            return done(error);
        }
    })
);

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.WEBAPP_URL}/api/auth/google/callback`,
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
                console.log(result.rows)
                if (result.rows.length === 0) {
                    console.log("adding new user to database")
                    const newUser = await db.query(
                        "INSERT INTO users (team_id, name, surname, image_url, email, password, type, level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                        [1, profile.given_name, profile.family_name, profile.picture, profile.email, "google", "coach", null]
                    );
                    return done(null, newUser.rows[0]);
                } else {
                    console.log("Using existing user from database")
                    return done(null, result.rows[0]);
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            done(null, result.rows[0]); // Attach user data to `req.user`
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, null);
    }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
