import express from 'express';
import db from '../db/db.js';
import Queries from "../db/queries.js";

const router = express.Router();

router.get("/moves", async (req, res) => {
    try {
        const movesResult = await db.query(Queries.allMoves);
        const usersResult = await db.query("SELECT * FROM users WHERE type = $1", ['competitor']);
        const ratingsResult = await db.query(Queries.allRatings);
        const ratingMoveIds = ratingsResult.rows.map(rating => rating.move_id);
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
            })
            .filter(move => !ratingMoveIds.includes(move.id))
        return res.json({ moves: moves });
    } catch (error) {
        return res.status(400).json({ error: "Bad request" });
    }
});

export default router;
