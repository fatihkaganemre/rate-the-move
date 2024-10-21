import React, { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import MovesGallery from "./MovesGallery"
import CompetitorsGallery from "./CompetitorsGallery";
import RatingsGallery from "./RatingsGallery";

function NavBar() {
    const [selectedNavItem, setSelectedNavItem] = useState("moves");

    function handleSignOut() {
        
    }

    function handleProfile() {

    }

    return (
        <BrowserRouter forceRefresh={false}>
        <header className="navBar p-3 mb-3 border-bottom">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <img className="logo" src="/default.svg" alt="Rate the move icon"/>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li className="nav-link px-2">
                        <Link 
                            onClick={() => setSelectedNavItem("moves")} 
                            className={ selectedNavItem == "moves" ? "nav-link px-2 link-secondary" :  "nav-link px-2 link-body-emphasis" }  
                            to="/moves"
                        >Moves</Link>
                    </li>
                    <li className="nav-link px-2">
                        <Link 
                            onClick={() => setSelectedNavItem("ratings")} 
                            className={ selectedNavItem == "ratings" ? "nav-link px-2 link-secondary" :  "nav-link px-2 link-body-emphasis" }  
                            to="/ratings"
                        >Ratings</Link>
                    </li>
                    <li className="nav-link px-2">
                        <Link 
                            onClick={() => setSelectedNavItem("competitors")} 
                            className={ selectedNavItem == "competitors" ? "nav-link px-2 link-secondary" :  "nav-link px-2 link-body-emphasis" }  
                            to="/competitors"
                        >Competitors</Link>
                    </li>
                </ul>

                <div className="dropdown text-end">
                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="mdo" width="50" height="50" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu text-small" >
                    <li><button onClick={handleProfile} className="dropdown-item">Profile</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button onClick={handleSignOut} className="dropdown-item">Sign out</button></li>
                </ul>
                </div>
            </div>
            </div>
        </header>
        <Routes>
            <Route path="/moves" element={ <MovesGallery /> } />
            <Route path="/ratings" element={ <RatingsGallery /> }/>
            <Route path="/competitors" element= { <CompetitorsGallery /> }/>
        </Routes>
        </BrowserRouter>
    )
};

export default NavBar;