import express from "express";
import path, { dirname }  from "path";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
env.config();
app.use(cors());

// Serve the React app in production mode
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend/public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const exampleDate = new Date("October 13, 2014 11:13:00");

var moves = [
    { 
        id: 2, 
        title: "Crazy Move 3", 
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
        date: exampleDate.toLocaleDateString(),
        videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
    },
    { 
        id: 3, 
        title: "Crazy Move 4", 
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
        date: exampleDate.toLocaleDateString(),
        videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
    }
];

var ratings = [
    {                         
        id: 0,
        title: "Crazy Move 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        date: exampleDate.toLocaleDateString(),
        comments: [{userId: 0, comment: "Good move, improve some part of it"}, {userId: 1, comment: "Good move, improve some part of it"}],
        isRated: true,
        rate: 3,
        videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {                         
        id: 1,
        title: "Crazy Move 2",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        date: exampleDate.toLocaleDateString(),
        comments: [{userId: 0, comment: "Good move, improve some part of it"}, {userId: 1, comment: "Good move, improve some part of it"}],
        isRated: true,
        rate: 5,
        videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    }
];

app.get("/getMoves", (req, res) => {
    setTimeout(function() {
        res.json({ moves: moves });
   },1000);

});

app.get("/getRatings", (req, res) => {
    setTimeout(function() {
        res.json({ ratings: ratings });
   },1000);
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


/* COMPETITORS */

const competitors = [
    { id: 2, name: "Fatih Emre", level: 5, numberOfMoves: 12 },
    { id: 3, name: "Maria Emre", level: 10, numberOfMoves: 24 },
    { id: 4, name: "Maciej Drazewski", level: 10, numberOfMoves: 24 },
    { id: 5, name: "Hubert Kaczamarek", level: 10, numberOfMoves: 24 },
    { id: 6, name: "Arek Kwaszniweski", level: 10, numberOfMoves: 24 }
];

const addedCompetitors = [
    { id: 2, name: "Fatih Emre", level: 5, numberOfMoves: 12 },
    { id: 3, name: "Maria Emre", level: 10, numberOfMoves: 24 },
];

app.get("/getAddedCompetitors", (req, res) => {
    setTimeout(function() {
        res.json({ competitors: addedCompetitors });
   },1000);
});

app.get("/searchCompetitors", (req, res) => {
    const query = req.query.q; // Get the search query parameter (e.g., ?q=somevalue)
    const notAddedCompetitors = competitors.filter(competitor => 
        !addedCompetitors.some(added => added.id === competitor.id)
    );
    const filteredCompetitors = notAddedCompetitors.filter(competitor =>
        competitor.name.toLowerCase().includes(query.toLowerCase())
    );
    res.json({ competitors: filteredCompetitors });
});