import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
import MovesGallery from "./tabs/MovesGallery"
import CompetitorsGallery from "./tabs/CompetitorsGallery";
import RatingsGallery from "./tabs/RatingsGallery";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from './authentication/Login';
import Register from './authentication/Register';
import Profile from './Profile';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  function handleSignOut() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('/logout', requestOptions)
      .then(response => response.json())
      .then(() => { 
        setLoggedIn(false);
        navigate("/login");
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
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: input })
    };

    fetch('/register', requestOptions)
      .then(response => response.json())
      .then(() => { 
        setLoggedIn(true);
        navigate("/moves");
      })
      .catch((error) => alert(error.message))
  }

  const handleRegisterTapped = () => navigate("/register");
  const handleCancelTapped = () => navigate("/login");
  const handleProfileTapped = () => navigate("/profile");

  function LoggedInUserUI() {
    return (
      <div>
        {location.pathname !== "/profile" && ( <NavBar onSignOut={handleSignOut} onProfile={handleProfileTapped} /> )}
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

  return (
    <div>
      {isLoggedIn ? <LoggedInUserUI /> : <LoggedOutUserUI />}
    </div>
  );
}

export default App;
