import React, { useState, useEffect } from "react";
import Move from "./Move";

function RatingsGallery() {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        fetchRatings();
    }, []);

    function fetchRatings() {
        fetch('/getRatings') 
          .then(response => response.json())
          .then(data => { setRatings(data.ratings) });
    }

    return (
        <div className="ratings-gallery">   
            { ratings.map( (move, index) => { 
                return (
                    <Move 
                        key={index} 
                        id={index} 
                        isRated={move.isRated}
                        rate={move.rate}
                        title={move.title} 
                        description={move.description} 
                        videoURL={move.videoURL} 
                    />
                );
            }) } 
        </div>
    )
};

export default RatingsGallery;