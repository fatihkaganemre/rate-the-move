import React , { useState, useEffect } from "react";
import Competitor from "./Competitor";
import Loader from "../common/Loader";
import SearchComponent from "../common/Search";

function CompetitorsGallery() {
    const [competitors, setCompetitors] = useState([]);
    const [loaderHidden, setLoaderHidden] = useState(true);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchCompetitors();
    }, []);

    function fetchCompetitors() {
        setLoaderHidden(false);

        fetch('/competitors') 
            .then(response => response.json())
            .then(data => { 
                console.log(data)
                data.competitors.length === 0 ? setTitle("No competitors found") : setCompetitors(data.competitors);
                setLoaderHidden(true);
            })
            .catch(error => setTitle("No competitors found"))
    };

    async function handleSearch(query) {
        try {
            const response = await fetch(`/searchCompetitors?q=${encodeURIComponent(query)}`);  
            if (!response.ok) { throw new Error(`Error: ${response.status} - ${response.statusText}`) }
            const data = await response.json();
            data.competitors.length === 0 ? setTitle("No competitors found") : setCompetitors(data.competitors);
        } catch (error) {
            setTitle("No competitors found");
        }
    };

    return (
        <div className="centered-flex">
            <SearchComponent 
                placeholder="Search for new competitor..."
                onQuery={handleSearch}
            />
            <Loader hidden={loaderHidden} />
            <div hidden={!loaderHidden} className="competitors-gallery">
            { competitors.length === 0 && <h1>{title}</h1>}
            { competitors.map((competitor) => { 
                return (
                    <Competitor 
                        id={competitor.id} 
                        key={competitor.id}
                        name={competitor.name}
                        level={competitor.level}
                        numberOfMoves={competitor.numberOfMoves}
                        imageURL={competitor.image_url}
                    />
                );
            })}
            </div>
        </div>
    )
}

export default CompetitorsGallery;