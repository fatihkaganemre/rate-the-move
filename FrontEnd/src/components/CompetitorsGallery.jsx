import React , { useState, useEffect } from "react";
import Competitor from "./Competitor";
import Loader from "./Loader";
import SearchComponent from "./Search";

function CompetitorsGallery() {
    const [competitors, setCompetitors] = useState([]);
    const [loaderHidden, setLoaderHidden] = useState(true);
    const [searchedCompetitors, setSearchedCompetitors] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchCompetitors();
    }, []);

    function fetchCompetitors() {
        setLoaderHidden(false);

        fetch('/getAddedCompetitors') 
            .then(response => response.json())
            .then(data => { 
                data.competitors.length === 0 ? setTitle("No competitors found") : setCompetitors(data.competitors);
                setLoaderHidden(true);
            })
            .catch(error => alert(error.message))
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
        } finally {
            //setLoading(false);         // Stop loading
        }
    };

    async function handleOnAdd(id) {
        try {
            const response = await fetch(`/addCompetitor?id=${encodeURIComponent(id)}`);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            } else {
                const addedCompetitor = searchedCompetitors.find((competitor) => competitor.id === id);
                setCompetitors( (prevCompetitors) => { return [...prevCompetitors, addedCompetitor]})
            }
        } catch (error) {
            setTitle(error.message)
        } finally {
            //setLoading(false);         // Stop loading
        }
    }

    return (
        <div className="centered-flex">
            <SearchComponent 
                placeholder="Search for new competitor..."
                onQuery={handleSearch}
                onAdd={handleOnAdd}
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