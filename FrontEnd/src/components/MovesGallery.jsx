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

    function handleOnRated(rate, id) {
        setMoves(prevMoves => {
            return prevMoves.map((move, index) => {
                return index === id ? { ...move, ["rate"]: rate } : move;
            });
        });
    }

    function handleSubmitRating(event, id) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let rate = Number(formData.get("rate"));
        let comment =  formData.get("comment");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, rate: rate, comment: comment})
        };
    
        fetch('/rate', requestOptions)
        .then(response => response.json())
        .then((response) => { 
            if (response.isRated) {
                setMoves( (prevMoves) => {
                    return prevMoves.filter((move) => move.id !== id);
                })
            }
        });
    } 

    return (
        <div className="moves-gallery">
            { moves.map( (move) => { 
                return (
                    <Move 
                        key={move.id} 
                        id={move.id} 
                        title={move.title} 
                        description={move.description} 
                        date={move.date}
                        videoURL={move.videoURL} 
                        onRated={handleOnRated}
                        onSubmitRating={handleSubmitRating }
                    />
                );
            }) } 
        </div>
    )
}

export default MovesGallery;