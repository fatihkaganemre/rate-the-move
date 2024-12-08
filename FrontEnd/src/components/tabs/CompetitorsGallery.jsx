import React , { useState, useEffect } from "react";
import Competitor from "./Competitor";
import Loader from "../common/Loader";
import SearchComponent from "../common/Search";

function CompetitorsGallery() {
    const [competitors, setCompetitors] = useState([]);
    const [loaderHidden, setLoaderHidden] = useState(true);
    const [searchedCompetitors, setSearchedCompetitors] = useState([]);
    const [title, setTitle] = useState("");
    const [addingItemId, setAddingItemId] = useState(null);

    useEffect(() => {
        fetchCompetitors();
    }, []);

    function fetchCompetitors() {
        setLoaderHidden(false);

        fetch('/competitors') 
            .then(response => response.json())
            .then(data => { 
                data.competitors.length === 0 ? setTitle("No competitors found") : setCompetitors(data.competitors);
                setLoaderHidden(true);
            })
            .catch(error => setTitle("No competitors found"))
    };

    async function handleSearch(query) {
        try {
            const response = await fetch(`/searchCompetitors?q=${encodeURIComponent(query)}`);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            data.competitors.length === 0 ? setTitle("No competitors found") : setSearchedCompetitors(data.competitors);
        } catch (error) {
            alert(error.message);
        }
    };

    async function handleOnAdd(id) {
        try {
            setAddingItemId(id);
            const response = await fetch(`/addCompetitor?id=${encodeURIComponent(id)}`);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            } else {
                const addedCompetitor = searchedCompetitors.find((competitor) => competitor.id === id);
                setCompetitors( (prevCompetitors) => { return [...prevCompetitors, addedCompetitor]})
                setSearchedCompetitors(prevCompetitors => prevCompetitors.filter( c => c.id !== addedCompetitor.id))
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setAddingItemId(null);
        }
    }

    return (
        <div className="centered-flex">
            <SearchComponent 
                placeholder="Search for new competitor..."
                onQuery={handleSearch}
                onAdd={handleOnAdd}
                addingItemId={addingItemId}
                items={searchedCompetitors}
            />
            <Loader hidden={loaderHidden} />
            <div hidden={!loaderHidden} className="competitors-gallery">
            { competitors.length === 0 && <h1>{title}</h1>}
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