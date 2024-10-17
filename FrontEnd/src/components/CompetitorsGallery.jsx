import React , { useState, useEffect } from "react";
import Competitor from "./Competitor";

function CompetitorsGallery() {
    const [competitors, setCompetitors] = useState([]);

    useEffect(() => {
        fetchCompetitors();
    }, []);

    function fetchCompetitors() {
        fetch('/getCompetitors') 
          .then(response => response.json())
          .then(data => { setCompetitors(data.competitors) });
    }

    return (
        <div className="competitors-gallery">
            { competitors.map((competitor, index) => { 
                return (
                    <Competitor 
                        id={index} 
                        key={index}
                        name={competitor.name}
                        level={competitor.level}
                        numberOfMoves={competitor.numberOfMoves}
                    />
                );
            })}
        </div>
    )
}

export default CompetitorsGallery;