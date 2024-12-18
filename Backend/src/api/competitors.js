import express from 'express';
import db from '../db/db.js';

export const competitorsRoutes = express.Router();


// Get added competitors
competitorsRoutes.get("/competitors", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE type = 'competitor'");
        if (result.rows.length === 0) { return res.status(404).json({ error: 'Not found' }) }
        res.json( { competitors: result.rows} )
    } catch {
        res.status(404).json({ error: 'Not found' });
    }
});

// Search competitors that are not added yet
competitorsRoutes.get("/searchCompetitors", (req, res) => {
    const query = req.query.q;
    const notAddedCompetitors = competitors.filter(competitor =>
        !addedCompetitors.some(added => added.id === competitor.id)
    );
    const filteredCompetitors = notAddedCompetitors.filter(competitor =>
        competitor.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json({ competitors: filteredCompetitors });
});

competitorsRoutes.get("/addCompetitor", (req, res) => {
    const id = parseInt(req.query.id, 10);  // Convert id to an integer
    const exists = addedCompetitors.some(competitor => competitor.id === id);
    
    if (exists) { 
        return res.status(200).json({ message: "Competitor already added" });
    }
    
    const newCompetitor = competitors.find(c => c.id === id);
    console.log(newCompetitor);
    
    if (newCompetitor) {
        addedCompetitors.push(newCompetitor);
        setTimeout(function() {
            res.status(200).json({ message: "Competitor added successfully" });
        }, 1000);
    } else {
        res.status(404).json({ message: "Competitor not found" });
    }
});
