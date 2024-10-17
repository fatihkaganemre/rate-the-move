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
        <BrowserRouter forceRefresh={true}>
        <header class="navBar p-3 mb-3 border-bottom">
            <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb- mb-lg-0 link-body-emphasis text-decoration-none">
                    <img className="logo" src="/default.svg" alt="" />
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li class="nav-link px-2">
                        <Link 
                            onClick={() => setSelectedNavItem("moves")} 
                            className={ selectedNavItem == "moves" ? "nav-link px-2 link-secondary" :  "nav-link px-2 link-body-emphasis" }  
                            to="/moves"
                        >Moves</Link>
                    </li>
                    <li class="nav-link px-2">
                        <Link 
                            onClick={() => setSelectedNavItem("ratings")} 
                            className={ selectedNavItem == "ratings" ? "nav-link px-2 link-secondary" :  "nav-link px-2 link-body-emphasis" }  
                            to="/ratings"
                        >Ratings</Link>
                    </li>
                    <li class="nav-link px-2">
                        <Link 
                            onClick={() => setSelectedNavItem("competitors")} 
                            className={ selectedNavItem == "competitors" ? "nav-link px-2 link-secondary" :  "nav-link px-2 link-body-emphasis" }  
                            to="/competitors"
                        >Competitors</Link>
                    </li>
                </ul>

                <div class="dropdown text-end">
                <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="mdo" width="50" height="50" class="rounded-circle" />
                </a>
                <ul class="dropdown-menu text-small" >
                    <li><button onClick={handleProfile} className="dropdown-item">Profile</button></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><button onClick={handleSignOut} class="dropdown-item">Sign out</button></li>
                </ul>
                </div>
            </div>
            </div>
        </header>
        <Routes>
            <Route exact path="/" element={ <h1>Home Page</h1>}/>
            <Route path="/moves" element={ <MovesGallery /> } />
            <Route path="/ratings" element={ <RatingsGallery /> }/>
            <Route path="/competitors" element= { <CompetitorsGallery /> }/>
        </Routes>
        </BrowserRouter>
    )
};

export default NavBar;