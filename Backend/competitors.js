import express from 'express';

export const competitors = [
    { id: 2, name: "Fatih Emre", level: 5, numberOfMoves: 12 },
    { id: 3, name: "Maria Emre", level: 10, numberOfMoves: 24 },
    { id: 4, name: "Maciej Drazewski", level: 10, numberOfMoves: 24 },
    { id: 5, name: "Hubert Kaczamarek", level: 10, numberOfMoves: 24 },
    { id: 6, name: "Arek Kwaszniweski", level: 10, numberOfMoves: 24 }
];

export const addedCompetitors = [
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

export default router;
