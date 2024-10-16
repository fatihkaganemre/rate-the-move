import React from "react";
import Move from "./Move";

function RatingsGallery() {
    return (
        <div className="ratings-gallery">   
            <Move isRated={true} />
            <Move isRated={true} />
            <Move isRated={true} />
        </div>
    )
};

export default RatingsGallery;