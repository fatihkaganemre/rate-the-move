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

app.get("/getCompetitors", (req, res) => {
    const competitors = [
        { name: "Fatih Emre", level: 5, numberOfMoves: 12 },
        { name: "Maria Emre", level: 10, numberOfMoves: 24 }
    ]
    res.json({ competitors: competitors });
});

app.get("/getMoves", (req, res) => {
    const moves = [
        { title: "Crazy Move", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
        { title: "Crazy Move", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
    ]
    res.json({ moves: moves });
});

app.get("/getRatings", (req, res) => {
    const ratings = [
        {                         
            title: "Crazy Move",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isRated: true,
            rate: 3,
            videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        {                         
            title: "Crazy Move",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            isRated: true,
            rate: 5,
            videoURL: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
    ]
    res.json({ ratings: ratings });
});

app.post("/rate", async (req, res) => {
    let id = req.body['id'];
    let rate = req.body['rate'];
    let comment = req.body['comment'];

    if (id != null && rate != null && comment != null) {

        return res.json({ isRated: true })
    } else {
        return res.json({ error: "Bad request" })
    }
})

// app.post("/addNote", async (req, res) => {
//   let title = req.body['title'];
//   let content = req.body['content'];

//   try {
//     await db.query(
//       "INSERT INTO notes (title, content) VALUES ($1, $2)",
//       [title, content]
//     );
//     var result = await db.query( "SELECT id FROM notes WHERE title=$1", [title]);
//     var id = result.rows[0];
//     res.json({id: id})
//   } catch (error) {
//     res.json({ error: error });
//   }
// })

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