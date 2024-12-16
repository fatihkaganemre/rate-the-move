import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
import MovesGallery from "./tabs/MovesGallery"
import CompetitorsGallery from "./tabs/CompetitorsGallery";
import RatingsGallery from "./tabs/RatingsGallery";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from './authentication/Login';
import Register from './authentication/Register';
import Profile from './profile/Profile';
import Loader from './common/Loader';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(); 

  useEffect(() => {
    checkAuthentication();
  }, []);

  function checkAuthentication() {
    fetch("/api/check-auth", { credentials: "include" })
      .then((response) => {
          if (response.ok) { return response.json(); }
          throw new Error("Not authenticated");
      })
      .then((data) => {
          setLoading(false);
          setUser(data.user);
          console.log(data.user);
          setLoggedIn(data.isLoggedIn);
          navigate("/moves");
      })
      .catch((error) => {
          alert(error);
          setLoggedIn(false);
          setLoading(false);
          navigate("/login");
      });
  }

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
        body: JSON.stringify({username: input.email, password: input.password})
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
      body: JSON.stringify(input)
    };

    fetch('/register', requestOptions)
      .then(response => response.json())
      .then(() => { 
        setLoggedIn(true);
        navigate("/moves");
      })
      .catch((error) => alert(error))
  }

  function removeAccount() {
    console.log("remove account")
  }

  const handleRegisterTapped = () => navigate("/register");
  const handleCancelTapped = () => navigate("/login");
  const handleProfileTapped = () => navigate("/profile");

  function LoggedInUserUI() {
    return (
      <div>
        {location.pathname !== "/profile" && ( <NavBar onSignOut={handleSignOut} onProfile={handleProfileTapped} userImage={user.image_url}/> )}
        <Routes>
          <Route path="/" element={ <MovesGallery /> } />
          <Route path="/moves" element={ <MovesGallery /> } />
          <Route path="/ratings" element={ <RatingsGallery /> }/>
          <Route path="/competitors" element= { <CompetitorsGallery /> }/>
          <Route path="/profile" element= { 
            <Profile 
              image_url={user.image_url} 
              username={`${user.name} ${user.surname}`} 
              email={user.email} 
              onRemoveAccount={removeAccount} /> 
          }/>
        </Routes>
      </div>
    ) 
  }

  function LoggedOutUserUI() {
    return (
      <div>
        <Routes>
          <Route path="/" element={ <Login onSubmit={login} onRegister={handleRegisterTapped} /> } />
          <Route path="/login" element={ <Login onSubmit={login} onRegister={handleRegisterTapped} /> } />
          <Route path="/register" element={ <Register onSubmit={register} onCancel={handleCancelTapped} /> }/>
        </Routes>
      </div>
    )
  }

  return isLoading 
    ? (<div><Loader/></div>) 
    : (<div> {isLoggedIn ? <LoggedInUserUI /> : <LoggedOutUserUI />} </div>);
}

export default App;
