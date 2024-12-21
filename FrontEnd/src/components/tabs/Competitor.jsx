import React from "react";

function Competitor(props) {
    return (
        <div className="competitor">
            <img
                style={styles.image}
                src={props.imageURL || "./user-placeholder.svg"}
                alt="Profile image"
                referrerPolicy="no-referrer"
            />
            <h1>{props.name}</h1>
            <h5>Level {props.level}</h5>
            <h5>Number of Moves: {props.numberOfMoves}</h5>
            <button onClick={props.onCheckTheMoves} type="submit" className="btn btn-light">
                Check the moves
            </button>
        </div>
    )
}

const styles = {
    image: {
        width: "100px",
        height: "100px",
        float: "left",
        marginRight: "20px",
        borderRadius: "50px"
    }
};

export default Competitor;