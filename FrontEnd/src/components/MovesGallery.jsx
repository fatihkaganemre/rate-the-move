import React, { useState, useEffect, FormEvent } from "react";
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

    function handleFormChange(event, id) {
        const { name, value } = event.target;
        console.log(id);

        setMoves(prevMoves => {
            return prevMoves.map((move, index) => {
                return index === id ? { ...move, [name]: value } : move;
            });
        });
    }

    function handleSubmitRating(event, id) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let rate = formData.get("rate");
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
            { moves.map( (move, index) => { 
                return (
                    <Move 
                        key={index} 
                        id={move.id} 
                        title={move.title} 
                        description={move.description} 
                        videoURL={move.videoURL} 
                        onMoveFormChange={handleFormChange}
                        onSubmitRating={handleSubmitRating}
                    />
                );
            }) } 
        </div>
    )
}

export default MovesGallery;