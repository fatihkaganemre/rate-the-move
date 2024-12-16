import React from "react";

function Competitor(props) {
    return (
        <div className="competitor">
            <div> {
                props.imageURL !== null 
                ? (<img src={props.imageURL} alt="Competitor profile photo" style={styles.image}/> )
                : (<svg style={styles.image} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                 </svg>)
            } </div>
            <h1>{props.name}</h1>
            <h5>Level {props.level}</h5>
            <h5>Number of Moves: {props.numberOfMoves}</h5>
            <button onClick={props.onCheckTheMoves} type="submit" className="btn btn-primary">
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