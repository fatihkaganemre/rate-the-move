import React, { useState, useEffect } from "react";
import Move from "./Move";

function MovesGallery() {
    const [moves, setMoves] = useState([]);

    useEffect(() => {
        fetchMoves();
    }, []);

    function fetchMoves() {
        fetch('/getMoves') 
          .then(response => response.json())
          .then(data => { setMoves(data.moves) });
    }

    function handleSubmit() {
        
    }

    return (
        <div className="moves-gallery">
            { moves.map( (move, index) => { 
                return (
                    <Move 
                        key={index} 
                        id={index} 
                        title={move.title} 
                        description={move.description} 
                        videoURL={move.videoURL} 
                    />
                );
            }) } 
        </div>
    )
}

export default MovesGallery;