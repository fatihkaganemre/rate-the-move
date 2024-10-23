import React, { useState, useEffect } from "react";
import Move from "./Move";
import Loader from "./Loader";
import SearchComponent from "./Search";

function RatingsGallery() {
    const [ratings, setRatings] = useState([]);
    const [loaderHidden, setLoaderHidden] = useState(true);

    useEffect(() => {
        fetchRatings();
    }, []);

    function fetchRatings() {
        setLoaderHidden(false);
        fetch('/getRatings') 
          .then(response => response.json())
          .then(data => { 
            setRatings(data.ratings);
            setLoaderHidden(true);
         });
    }

    return (
        <div className="centered-flex"> 
            <SearchComponent placeholder="Search for rating..." />
            <Loader hidden={loaderHidden} />
            <div hidden={!loaderHidden} className="ratings-gallery">   
                { ratings.length == 0 && <h1> No ratings yet.</h1>}
                { ratings.map( (move) => { 
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