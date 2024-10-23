import React , { useState, useEffect } from "react";
import Competitor from "./Competitor";
import Loader from "./Loader";

function CompetitorsGallery() {
    const [competitors, setCompetitors] = useState([]);
    const [loaderHidden, setLoaderHidden] = useState(true);

    useEffect(() => {
        fetchCompetitors();
    }, []);

    function fetchCompetitors() {
        setLoaderHidden(false);

        fetch('/getCompetitors') 
          .then(response => response.json())
          .then(data => { 
            setCompetitors(data.competitors)
            setLoaderHidden(true);
         });
    }

    return (
        <div className="centered">
            <Loader hidden={loaderHidden} />
            <div hidden={!loaderHidden} className="competitors-gallery">
            { competitors.length == 0 && <h1 hidden> No competitors yet.</h1>}
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
        </div>
    )
}

export default CompetitorsGallery;