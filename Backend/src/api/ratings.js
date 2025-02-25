import express from 'express';
import { db } from '../db/db.js';
import Queries from '../db/queries.js';

export const ratingsRoutes = express.Router();

ratingsRoutes.post("/rate", async (req, res) => {
    try {
        const coachId = req.user?.id;
        if (!coachId) { return res.status(400).json({ error: "Invalid user or missing authentication." }) }

        const { id, rate, comment } = req.body;
        if (!id || rate === undefined || !comment) { return res.status(400).json({ error: "Missing required fields." }) }

        await db.query(
            "INSERT INTO ratings (move_id, coach_id, rate, comment) VALUES ($1, $2, $3, $4)",
            [id, coachId, rate, comment]
        );

        res.status(201).json({ success: true, message: "Rating added successfully." });
    } catch (error) {
        console.error("Error inserting rating:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

ratingsRoutes.get("/ratings", async (req, res) => {
    try {
        const [ratingsResult, movesResult, usersResult] = await Promise.all([
            db.query(Queries.allRatings),
            db.query(Queries.allMoves),
            db.query(Queries.allUsers),
        ]);

        const ratedMoves = movesResult.rows.filter( move => {
            const ids = ratingsResult.rows.map( ratings => ratings.move_id);
            return ids.includes(move.id);
        })
        const ratings = ratedMoves.map ( move => {
            const rates = ratingsResult.rows
                .filter( rating => rating.move_id === move.id )
                .map( rating => {
                    const coach = usersResult.rows.find( user => user.id === rating.coach_id );
                    return {
                        coachFullName: `${coach.name} ${coach.surname}`,
                        rate: rating.rate,
                        comment: rating.comment
                    }
                });
            const user = usersResult.rows.find(user => user.id === move.user_id);
            return {
                move: move, 
                user: user,
                rates: rates
            }
        })    
        return res.json( {ratings: ratings} )
    } catch (error) {
        return res.status(400).json({ error: "Bad request" });
    }
});

