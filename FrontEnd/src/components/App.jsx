import NavBar from './NavBar';
import React, { useState } from 'react';
import MovesGallery from "./MovesGallery"
import CompetitorsGallery from "./CompetitorsGallery";
import RatingsGallery from "./RatingsGallery";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  function handleSignOut() {
    setLoggedIn(false);
  }

  function handleLogin(input) {
    console.log(input);
    setLoggedIn(true);
  }

  return (
    <div>
      { isLoggedIn ? 
      (<BrowserRouter forceRefresh={false}>
        <NavBar onSignOut={handleSignOut} />
        <Routes>
          <Route path="/moves" element={ <MovesGallery /> } />
          <Route path="/ratings" element={ <RatingsGallery /> }/>
          <Route path="/competitors" element= { <CompetitorsGallery /> }/>
        </Routes>
      </BrowserRouter>) : <Login onLogin={handleLogin} /> }
    </div>
  );
}

export default App;
