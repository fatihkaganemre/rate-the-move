import React, { useState, useEffect } from "react";
import Move from "./Move";
import Loader from "./Loader";
import SearchComponent from "./Search";

function RatingsGallery() {
    const [ratings, setRatings] = useState([]);
    const [filteredRatings, setFilteredRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchRatings();
    }, []);

    function fetchRatings() {
        setIsLoading(true);
        fetch('/getRatings') 
          .then(response => response.json())
          .then(data => { 
            setRatings(data.ratings);
            setFilteredRatings(data.ratings);
            setIsLoading(false);
         });
    };

    function handleSearch(query) {
        const lowercasedQuery = query.toLowerCase();
        const filtered = ratings.filter(rate => rate.title.toLowerCase().includes(lowercasedQuery));
        setFilteredRatings(filtered);
    };

    return (
        <div className="centered-flex"> 
            <SearchComponent 
                hidden={isLoading}
                placeholder="Search for rating..."
                onQuery={handleSearch}
            />
            <Loader hidden={!isLoading} />
            {!isLoading && ratings.length === 0 && <h1>No ratings found!</h1>}
            <div className="ratings-gallery">   
                { filteredRatings.map( (move) => { 
                    return (
                        <Move 
                            key={move.id} 
                            id={move.id} 
                            isRated={move.isRated}
                            rate={move.rate}
                            title={move.title} 
                            description={move.description} 
                            date={move.date}
                            videoURL={move.videoURL}
                            comments={move.comments}
                        />
                    );
                }) } 
            </div>
        </div>
    )
};

export default RatingsGallery;