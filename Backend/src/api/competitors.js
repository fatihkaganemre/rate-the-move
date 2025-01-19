import express from 'express';
import { db } from '../db/db.js';

export const competitorsRoutes = express.Router();


// Get added competitors
competitorsRoutes.get("/competitors", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE type=$1", ['competitor']);
        if (result.rows.length === 0) { return res.status(404).json({ error: 'Not found' }) }
        res.json( { competitors: result.rows} )
    } catch {
        res.status(404).json({ error: 'Not found' });
    }
});

// Search competitors that are not added yet
competitorsRoutes.get("/searchCompetitors", async (req, res) => {
    try { 
        const query = req.query.q;
        const result = await db.query("SELECT * FROM users WHERE type = 'competitor'");
        const competitors = result.rows.filter(competitor =>
            competitor.name.toLowerCase().includes(query.toLowerCase())
        );
        res.json({ competitors });
    } catch {
        res.status(404).json({ error: 'Not found' });
    }
});
