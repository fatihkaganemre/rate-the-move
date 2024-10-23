import React, { useState, useEffect } from "react";
import Move from "./Move";
import Loader from "./Loader";
import SearchComponent from "./Search";

function MovesGallery() {
    const [moves, setMoves] = useState([]);
    const [loaderHidden, setLoaderHidden] = useState(true);

    useEffect(() => {
        fetchMoves();
    }, []);

    function fetchMoves() {
        setLoaderHidden(false)
        fetch('/getMoves') 
          .then(response => response.json())
          .then(data => { 
            setMoves(data.moves);
            setLoaderHidden(true);
         });
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
        <div className="centered-flex">
            <SearchComponent hidden={!loaderHidden || moves.length < 1} placeholder="Search for a move..."/>
            <Loader hidden={loaderHidden}/>
            <div hidden={!loaderHidden} className="moves-gallery">
                { moves.length == 0 && <h1> No new moves added.</h1>}
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
        </div>
    )
}

export default MovesGallery;