import React, { useState, useEffect } from "react";
import Move from "./Move";
import Loader from "../../common/Loader";
import SearchComponent from "../../common/Search";

function MovesGallery() {
    const [moves, setMoves] = useState([]);
    const [filteredMoves, setFilteredMoves] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [submittingMoveId, setSubmittingMoveId] = useState("");

    useEffect(() => {
        fetchMoves();
    }, []);

    function fetchMoves() {
        setIsLoading(true)
        fetch('/api/moves') 
            .then(response => response.json())
            .then(data => { 
                if (data.moves.length > 0) {
                    setMoves(data.moves);
                    setFilteredMoves(data.moves);
                };
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error.message);
            })
    }

    function handleOnRated(rate, id) {
        setMoves(prevMoves => {
            return prevMoves.map((move) => { return move.id === id ? { ...move, rate } : move });
        });
    }

    function handleSubmitRating(event, id) {
        setSubmittingMoveId(id);
    
        const formData = new FormData(event.currentTarget);
        const rate = Number(formData.get("rate"));
        const comment = formData.get("comment");
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, rate, comment })
        };
    
        fetch('/api/rate', requestOptions)
            .then(response => response.json())
            .then(() => { 
                setMoves((prevMoves) => prevMoves.filter((move) => move.id !== id));
                setFilteredMoves((prevMoves) => prevMoves.filter((move) => move.id !== id));
                setSubmittingMoveId(null);
            })
            .catch((error) => {
                alert(error.message);
                setSubmittingMoveId(null);
            })
    }

    function handleSearch(query) {
        const lowercasedQuery = query.toLowerCase();
        const filtered = moves.filter(move => {
            return move.title.toLowerCase().includes(lowercasedQuery) || move.user.name.toLowerCase().includes(lowercasedQuery)
        });
        setFilteredMoves(filtered);
    };

    return (
        <div className="centered-flex">
            <SearchComponent 
                hidden={isLoading || moves.length === 0} 
                placeholder="Search for a move..."
                onQuery={handleSearch}
            />
            <Loader hidden={!isLoading}/>
            {!isLoading && filteredMoves.length === 0 && <h1>No moves found!</h1>}
            <div className="moves-gallery">
                { filteredMoves.map( (move) => { 
                    return (
                        <Move 
                            key={move.id} 
                            id={move.id} 
                            userName= {move.user.name}
                            userImage= {move.user.image_url}
                            title={move.title} 
                            description={move.description} 
                            date={move.date}
                            videoURL={move.videoURL} 
                            onRated={handleOnRated}
                            onSubmitRating={handleSubmitRating}
                            isSubmitting={submittingMoveId === move.id}
                        />
                    );
                }) } 
            </div>
        </div>
    )
}

export default MovesGallery;