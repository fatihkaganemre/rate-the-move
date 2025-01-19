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
import { movesRoutes } from "./api/moves.js";
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
app.use(movesRoutes);
app.use(ratingsRoutes);
app.use(accountRoutes);

console.log(`Connecting with webapp ${process.env.WEBAPP_URL}`)

// Passport Configuration
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);
            if (result.rows.length === 0) return done(null, false, { message: "User not found" });
            const user = result.rows[0];
            if (user.isThirdPartyLogin) { return done(null, false, { message: "Third party login , try with google authentication" }) };
            const isValid = await bcrypt.compare(password, user.password);
            return isValid ? done(null, { ...user, isThirdPartyLogin: false }) : done(null, false, { message: "Incorrect password" });
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
            const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
            if (result.rows.length === 0) {
                return done(null, { 
                    isThirdPartyLogin: true, 
                    email: profile.email, 
                    name: profile.given_name, 
                    surname: profile.family_name, 
                    image_url: profile.picture 
                });
            } else {
                return done(null, { ...result.rows[0], isThirdPartyLogin: true });
            }
        }
    )
);

passport.serializeUser((user, done) => {
    try {
        if (user.id) {
            done(null, { type: "existingUser", id: user.id, isThirdPartyLogin: user.isThirdPartyLogin });
        } else  {
            const newUserData = {
                isThirdPartyLogin: user.isThirdPartyLogin,
                email: user.email,
                name: user.name,
                surname: user.surname,
                image_url: user.image_url,
            };
            const serializedData = `newUser:${JSON.stringify(newUserData)}`;
            done(null, { type: "newUser", data: serializedData });
        }
    } catch (error) {
        console.error("Error in serializeUser:", error.message);
        done(error);
    }
});

passport.deserializeUser(async (serializedData, done) => {
    try {
        if (serializedData.type === "newUser") {
            const newUser = JSON.parse(serializedData.data.substring(8));
            done(null, {
                isThirdPartyLogin: newUser.isThirdPartyLogin,
                email: newUser.email,
                name: newUser.name,
                surname: newUser.surname,
                image_url: newUser.image_url,
            });
        } else if (serializedData.type === "existingUser") {
            const result = await db.query("SELECT * FROM users WHERE id = $1", [serializedData.id]);
            if (result.rows.length === 0) { done(null, false) };
            done(null, { ...result.rows[0], isThirdPartyLogin: serializedData.isThirdPartyLogin});
        } else {
            throw new Error("Unknown user type during deserialization");
        }
    } catch (error) {
        console.error("Error in deserializeUser:", error.message);
        done(error);
    }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
