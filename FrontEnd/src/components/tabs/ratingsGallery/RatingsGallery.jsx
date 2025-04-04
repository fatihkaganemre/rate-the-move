import React, { useState, useEffect } from "react";
import Rating from "./Rating";
import Loader from "../../common/Loader";
import SearchComponent from "../../common/Search";
import { formatDate } from "../../../helpers/dateFormatter";
import './ratingsGallery.css';

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
            initializeViewWith(data.ratings);
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
            return rate.move.title.toLowerCase().includes(lowercasedQuery) || rate.user.name.toLowerCase().includes(lowercasedQuery)
        });
        setFilteredRatings(filtered);
    };

    return (
        <div className="centered-flex"> 
            <SearchComponent 
                hidden={isLoading}
                placeholder="Search rating by title or user"
                onQuery={handleSearch}
            />
            <Loader hidden={!isLoading} />
            {!isLoading && ratings.length === 0 && <h1>No ratings found!</h1>}
            <div className="ratings-gallery">   
                { filteredRatings.map( (rating) => { 
                    const date = formatDate(rating.move.date);
                    return (
                        <Rating 
                            key={rating.move.id} 
                            id={rating.move.id} 
                            userImage={rating.user.image_url}
                            userName={rating.user.name}
                            move={rating.move}
                            date={date}
                            rates={rating.rates}
                        />
                    );
                }) } 
            </div>
        </div>
    )
};

export default RatingsGallery;