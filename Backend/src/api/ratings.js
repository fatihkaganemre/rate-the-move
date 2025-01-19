import express from 'express';
import { db } from '../db/db.js';

export const ratingsRoutes = express.Router();

ratingsRoutes.post("/rate", async (req, res) => {
    const coachId = req.user.id; 
    if (coachId === null) { return res.status(400).json({ error: "Bad request" }); }
    const {id, rate, comment} = req.body;
    try {
        await db.query(
            "INSERT INTO ratings (move_id, coach_id, rate, comment) VALUES ($1, $2, $3, $4)",
            [id, coachId, rate, comment]
        );
    } catch {
        return res.status(400).json({ error: "Bad request" });
    }
});

ratingsRoutes.get("/ratings", async (req, res) => {
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