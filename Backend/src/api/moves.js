import express from 'express';
import { db } from '../db/db.js';
import Queries from "../db/queries.js";

export const movesRoutes = express.Router();

movesRoutes.get("/moves", async (req, res) => {
    try {
        const movesResult = await db.query(Queries.allMoves);
        const usersResult = await db.query("SELECT * FROM users WHERE type = $1", ['competitor']);
        const ratingsResult = await db.query(Queries.allRatings);
        const isCompetitor = req.user.type === 'competitor';
        const ratingMoveIds = ratingsResult.rows
            .filter(rating => {
                if (isCompetitor) {
                    let competitorMoves = movesResult.rows.filter(move => move.user_id === req.user.id);
                    return competitorMoves.includes(rating.move_id);
                } else { 
                    return rating.coach_id === req.user.id
                }
            })
            .map(rating => rating.move_id);

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

movesRoutes.delete("/moves/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM moves WHERE id = $1", [id]);
        return res.json({ success: true, message: "Move deleted successfully." });
    } catch (error) {
        return res.status(400).json({ error: "Failed to delete move." });
    }
});

movesRoutes.put("/moves/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(req.body);

    try {
        await db.query(
            "UPDATE moves SET title = $1, description = $2 WHERE id = $3",
            [title, description, id]
        );
        return res.json({ success: true, message: "Move updated successfully." });
    } catch (error) {
        return res.status(400).json({ error: "Failed to update move." });
    }
});
