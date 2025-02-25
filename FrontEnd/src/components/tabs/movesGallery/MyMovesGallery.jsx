import React, { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import SearchComponent from "../../common/Search";
import MyMove from "./MyMove";
import './myMovesGallery.css'

function MyMovesGallery(props) {
    const [moves, setMoves] = useState([]);
    const [filteredMoves, setFilteredMoves] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMoves();
    }, []);

    function fetchMoves() {
        setIsLoading(true)
        fetch('/api/moves') 
            .then(response => response.json())
            .then(data => { 
                if (data.moves.length > 0) {
                    let myMoves = data.moves.filter(move => move.user.id === props.userId);
                    setMoves(myMoves);
                    setFilteredMoves(myMoves);
                };
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false);
                alert(error.message);
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
            <div onClick={props.onAddMove} className="addMoveIcon">
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            {!isLoading && filteredMoves.length === 0 && <h1>No moves found!</h1>}
            <div className="moves-gallery">
                { filteredMoves.map( (move) => { 
                    return (
                        <MyMove 
                            key={move.id} 
                            id={move.id} 
                            title={move.title} 
                            description={move.description} 
                            date={move.date}
                            videoURL={move.videoURL} 
                        />
                    );
                }) } 
            </div>
        </div>
    )
}

export default MyMovesGallery;