import NavBar from './NavBar';
import React, { useState } from 'react';
import MovesGallery from "./MovesGallery"
import CompetitorsGallery from "./CompetitorsGallery";
import RatingsGallery from "./RatingsGallery";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleSignOut() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('/logout', requestOptions)
      .then(response => response.json())
      .then(() => { 
        setLoggedIn(false);
        navigate("/");
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
        navigate("/moves");
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div>
      { isLoggedIn ? 
      (<div>
        <NavBar onSignOut={handleSignOut} />
        <Routes>
          <Route path="/moves" element={ <MovesGallery /> } />
          <Route path="/ratings" element={ <RatingsGallery /> }/>
          <Route path="/competitors" element= { <CompetitorsGallery /> }/>
        </Routes>
        </div>) : <Login onLogin={handleLogin} /> }
    </div>
  );
}

export default App;
