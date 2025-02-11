import React, { useState, useEffect } from "react";
import Move from "./Move";
import Loader from "../common/Loader";
import SearchComponent from "../common/Search";

function RatingsGallery(props) {
    const [ratings, setRatings] = useState([]);
    const [filteredRatings, setFilteredRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchRatings();
    }, []);

    function fetchRatings() {
        setIsLoading(true);
        fetch('/api/ratings') 
          .then(response => response.json())
          .then(data => { 
            if (props.isCompetitor && props.userId !== null) {
                let myRatings = data.ratings.filter(rating => rating.user.id === props.userId);
                initializeViewWith(myRatings);
            } else {
                initializeViewWith(data.ratings);
            }
            setIsLoading(false);
         });
    };

    function initializeViewWith(ratings) {
        setRatings(ratings);
        setFilteredRatings(ratings);
    }

    function handleSearch(query) {
        const lowercasedQuery = query.toLowerCase();
        const filtered = ratings.filter(rate => {
            return rate.title.toLowerCase().includes(lowercasedQuery) || rate.user.name.toLowerCase().includes(lowercasedQuery)
        });
        setFilteredRatings(filtered);
    };

    return (
        <div className="centered-flex"> 
            <SearchComponent 
                hidden={isLoading || ratings.length === 0}
                placeholder="Search rating by title or user"
                onQuery={handleSearch}
            />
            <Loader hidden={!isLoading} />
            {!isLoading && ratings.length === 0 && <h1>No ratings found!</h1>}
            <div className="ratings-gallery">   
                { filteredRatings.map( (rating) => { 
                    return (
                        <Move 
                            key={rating.id} 
                            id={rating.id} 
                            userName={rating.user.name}
                            userImage={rating.user.image_url}
                            rate={rating.rate}
                            title={rating.title} 
                            description={rating.description} 
                            date={rating.date}
                            videoURL={rating.videoURL}
                            comments={rating.comments}
                        />
                    );
                }) } 
            </div>
        </div>
    )
};

export default RatingsGallery;