import NavBar from './NavBar';
import React, { useState } from 'react';
import MovesGallery from "./MovesGallery"
import CompetitorsGallery from "./CompetitorsGallery";
import RatingsGallery from "./RatingsGallery";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  function handleSignOut() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('/logout', requestOptions)
      .then(response => response.json())
      .then(() => { 
        setLoggedIn(false);
      })
      .catch((error) => alert(error.message))
  }

  function handleLogin(input) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input })
    };

    fetch('/login', requestOptions)
      .then(response => response.json())
      .then(() => { 
        setLoggedIn(true);
      })
      .catch((error) => alert(error.message))
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
