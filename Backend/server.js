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

const competitors = [
    { id: 0, name: "Fatih Emre", level: 5, numberOfMoves: 12 },
    { id: 1, name: "Maria Emre", level: 10, numberOfMoves: 24 }
]

var moves = [
    { id: 2, title: "Crazy Move 3", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: 3, title: "Crazy Move 4", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
];

var ratings = [
    {                         
        id: 0,
        title: "Crazy Move 1",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        comments: [{userId: 0, comment: "Good move, improve some part of it"}, {userId: 1, comment: "Good move, improve some part of it"}],
        isRated: true,
        rate: 3,
        videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {                         
        id: 1,
        title: "Crazy Move 2",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        comments: [{userId: 0, comment: "Good move, improve some part of it"}, {userId: 1, comment: "Good move, improve some part of it"}],
        isRated: true,
        rate: 5,
        videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    }
];


app.get("/getCompetitors", (req, res) => {
    res.json({ competitors: competitors });
});

app.get("/getMoves", (req, res) => {
    res.json({ moves: moves });
});

app.get("/getRatings", (req, res) => {
    res.json({ ratings: ratings });
});

app.post("/rate", async (req, res) => {
    console.log(req.body);
    let id = req.body['id'];
    let rate = req.body['rate'];
    let comment = req.body['comment'];

    if (id !== null && rate !== null && comment !== null) {
        let newRating = moves.find( (move) => move.id === id ); 
        newRating.rate = rate;
        newRating.isRated = true;
        newRating.comments = [{userId: 0, comment: comment}];
        ratings.push(newRating);
        moves = moves.filter( (move) => move.id === id);
        return res.json({ isRated: true })
    } else {
        return res.json({ error: "Bad request" })
    }
})


// app.delete("/deleteNote", async (req, res) => {
//   const noteId = req.body.id;
//   try {
//     await db.query(
//       "DELETE FROM notes WHERE id=$1",
//       [noteId]
//     );
//     res.json({ isDeleted: true })
//   } catch (error) {
//     res.json({ error: error });
//   }
// });