import pg from 'pg';
import env from "dotenv";

env.config();
export const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect(err => {
    if (err) {
        console.error("Database connection error:", err.stack);
    } else {
        console.log("Database connected successfully.");
    }
});