import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
import MovesGallery from "./MovesGallery"
import CompetitorsGallery from "./CompetitorsGallery";
import RatingsGallery from "./RatingsGallery";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

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

  function login(input) {
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

  function register(input) {

  }

  function handleRegisterTapped() {
    navigate("/register")
  }

  function handleCancelTapped() {
    navigate("/login")
  }

  function handleProfileTapped() {
    navigate("profile")
  }

  function LoggedInUserUI() {
    return (
      <div>
        <NavBar onSignOut={handleSignOut} onProfile={handleProfileTapped} />
        <Routes>
          <Route path="/moves" element={ <MovesGallery /> } />
          <Route path="/ratings" element={ <RatingsGallery /> }/>
          <Route path="/competitors" element= { <CompetitorsGallery /> }/>
          <Route path="/profile" element= { <Profile /> }/>
        </Routes>
      </div>
    ) 
  }

  function LoggedOutUserUI() {
    return (
      <div>
        <Routes>
          <Route path="/login" element={ <Login onSubmit={login} onRegister={handleRegisterTapped} /> } />
          <Route path="/register" element={ <Register onSubmit={register} onCancel={handleCancelTapped} /> }/>
        </Routes>
      </div>
    )
  }

  useEffect(() => {
    navigate("login")
  }, []);

  return (
    <div>
      { isLoggedIn ? LoggedInUserUI() : LoggedOutUserUI() }
    </div>
  );
}

export default App;
