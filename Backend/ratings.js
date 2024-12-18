import express from 'express';
import db from './db.js';
import Queries from "./queries.js";

const router = express.Router();

router.get("/ratings", async (req, res) => {
    try {
        const ratingsResult = await db.query(Queries.allRatings);
        const movesResult = await db.query(Queries.allMoves)
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
                user,
            };
        });
        return res.json( {ratings: ratings} )
    } catch (error) {
        return res.status(400).json({ error: "Bad request" });
    }
});

router.post("/rate", async (req, res) => {
    const coachId = req.user.id; 
    if (coachId === null) { return res.status(400).json({ error: "Bad request" }); }
    const {id, rate, comment} = req.body;
    try {
        await db.query(Queries.insertRating, [id, coachId, rate, comment]);
    } catch {
        return res.status(400).json({ error: "Bad request" });
    }
});

export default router;
