const Queries = {
    insertRating: "INSERT INTO ratings (move_id, coach_id, rate, comment) VALUES ($1, $2, $3, $4)",
    allRatings: "SELECT * FROM ratings",
    allMoves: "SELECT * FROM moves",
    allUsers: "SELECT * FROM users"

};

export default Queries;