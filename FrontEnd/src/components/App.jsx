import NavBar from './NavBar';
import React from 'react';
import MovesGallery from "./MovesGallery"
import CompetitorsGallery from "./CompetitorsGallery";
import RatingsGallery from "./RatingsGallery";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';

function App() {
  const isLoggedIn = true;

  return (
    <div>
      { isLoggedIn ? 
      (<BrowserRouter forceRefresh={false}>
        <NavBar />
        <Routes>
          <Route path="/moves" element={ <MovesGallery /> } />
          <Route path="/ratings" element={ <RatingsGallery /> }/>
          <Route path="/competitors" element= { <CompetitorsGallery /> }/>
        </Routes>
      </BrowserRouter>) : <Login /> }
    </div>
  );
}

export default App;
