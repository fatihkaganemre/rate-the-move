import express from 'express';

export const competitors = [
    { id: 2, name: "Fatih Emre", level: 5, numberOfMoves: 12 },
    { id: 3, name: "Maria Emre", level: 10, numberOfMoves: 24 },
    { id: 4, name: "Maciej Drazewski", level: 10, numberOfMoves: 24 },
    { id: 5, name: "Hubert Kaczamarek", level: 10, numberOfMoves: 24 },
    { id: 6, name: "Arek Kwaszniweski", level: 10, numberOfMoves: 24 }
];

export var addedCompetitors = [
    { id: 2, name: "Fatih Emre", level: 5, numberOfMoves: 12 },
    { id: 3, name: "Maria Emre", level: 10, numberOfMoves: 24 },
];

// Create a router
const router = express.Router();

// Get added competitors
router.get("/getAddedCompetitors", (req, res) => {
    setTimeout(function() {
        res.json({ competitors: addedCompetitors });
    }, 1000);
});

// Search competitors that are not added yet
router.get("/searchCompetitors", (req, res) => {
    const query = req.query.q;
    const notAddedCompetitors = competitors.filter(competitor =>
        !addedCompetitors.some(added => added.id === competitor.id)
    );
    const filteredCompetitors = notAddedCompetitors.filter(competitor =>
        competitor.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json({ competitors: filteredCompetitors });
});

router.get("/addCompetitor", (req, res) => {
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

export default router;
