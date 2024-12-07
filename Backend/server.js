import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import bcrypt from "bcrypt";
import path, { dirname }  from "path";
import cors from "cors";
import env from "dotenv";
import db from './db.js';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';

import competitorsRoutes from './competitors.js';
import authenticationRoutes from './authentication.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
env.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000", // Replace with your front-end origin
        credentials: true, // Allows session cookies to be sent
    })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend/public')));
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

app.get("/moves", async (req, res) => {
    try {
        const movesResult = await db.query("SELECT * FROM moves");
        const usersResult = await db.query("SELECT * FROM users WHERE type = $1", ['competitor']);
        const moves = movesResult.rows
            .map(move => {
                const user = usersResult.rows.find( user => user.id === move.user_id);
                return {
                    id: move.id,
                    title: move.title,
                    description: move.description,
                    date: move.date,
                    videoURL: move.video_url,
                    user: user,
                };
            }).filter(move => move.rate === undefined)
        return res.json({ moves: moves });
    } catch (error) {
        return res.status(400).json({ error: "Bad request" });
    }
});

app.get("/ratings", async (req, res) => {
    try {
        const ratingsResult = await db.query("SELECT * FROM ratings");
        const movesResult = await db.query("SELECT * FROM moves")
        const usersResult = await db.query("SELECT * FROM users WHERE type = $1", ['competitor']);
        const ratings = ratingsResult.rows.map(rating => {
            const move = movesResult.rows.find( move => move.id === rating.move_id);
            const user = usersResult.rows.find( user => user.id === move.user_id);
            return {
                id: move.id,
                title: move.title,
                description: move.description,
                date: move.date,
                videoURL: move.video_url,
                rate: rating.rate,
                comments: [ rating.comment ],
                user: user,
            };
        });
        return res.json( {ratings: ratings} )
    } catch (error) {
        return res.status(400).json({ error: "Bad request" });
    }
});

app.post("/rate", async (req, res) => {
    console.log(req.body);
    let id = req.body['id'];
    let rate = req.body['rate'];
    let comment = req.body['comment'];

    if (id !== null && rate !== null && comment !== null && rate !== 0 && rate <= 5) {
        let newRating = moves.find( (move) => move.id === id ); 
        if (!newRating) {
            return res.status(404).json({ error: "Movie not found" });
        }

        newRating.rate = rate;
        newRating.isRated = true;
        newRating.comments = [{userId: 0, comment: comment}];
        ratings.push(newRating);
        moves = moves.filter( (move) => move.id !== id);

        setTimeout(function() {
            return res.status(200).json({ message: "Rating submitted successfully" });
       },1000);
    } else {
        setTimeout(function() {
            return res.status(400).json({ error: "Bad request" });
       },1000);
    }
});


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
        callbackURL: "http://localhost:3001/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
                if (result.rows.length === 0) {
                    const newUser = await db.query(
                        "INSERT INTO users (team_id, name, surname, image_url, email, password, type, level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                        [1, profile.given_name, profile.family_name, profile.picture, profile.email, "google", "coach", null]
                    );
                    return done(null, newUser.rows[0]);
                } else {
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