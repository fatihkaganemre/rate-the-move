import NavBar from './navbar/NavBar';
import React, { useState, useEffect } from 'react';
import MovesGallery from "./tabs/MovesGallery"
import CompetitorsGallery from "./tabs/CompetitorsGallery";
import RatingsGallery from "./tabs/RatingsGallery";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from './authentication/Login';
import Register from './authentication/Register';
import Profile from './profile/Profile';
import Loader from './common/Loader';
import useAuth from '../hooks/useAuth';
import { AuthProvider, useAuthContext } from '../contexts/AuthContext';

function AppContent() {
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const [isLoading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(); 
  const { logout, register, login } = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, []);

  function checkAuthentication() {
    fetch("/api/auth/check-auth", { credentials: "include" })
      .then((response) => {
          if (response.ok) { return response.json(); }
          throw new Error("Not authenticated");
      })
      .then((data) => {
          setLoading(false);
          setUser(data.user);
          setIsLoggedIn(data.isLoggedIn);
          navigate("/moves");
      })
      .catch((error) => {
          setIsLoggedIn(false);
          setLoading(false);
          navigate("/login");
      });
  }

  function handleRemovedAccount() {
    setIsLoggedIn(false);
    navigate("/login");
  }

  const handleRegisterTapped = () => navigate("/register");
  const handleCancelTapped = () => navigate("/login");
  const handleProfileTapped = () => navigate("/profile");

  function LoggedInUserUI() {
    return (
      <div>
        {location.pathname !== "/profile" && (
           <NavBar 
            onSignOut={logout} 
            onProfile={handleProfileTapped} 
            userImage={user.image_url || './user-placeholder.svg'} 
            username={user.name}/> 
        )}
        <Routes>
          <Route path="/" element={ <MovesGallery /> } />
          <Route path="/moves" element={ <MovesGallery /> } />
          <Route path="/ratings" element={ <RatingsGallery /> }/>
          <Route path="/competitors" element= { <CompetitorsGallery /> }/>
          <Route path="/profile" element= { 
            <Profile 
              image_url={user.image_url || './user-placeholder.svg'} 
              username={`${user.name} ${user.surname}`} 
              email={user.email}
              onRemovedAccount={handleRemovedAccount}
              /> 
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

export default function App() {
  return (
      <AuthProvider>
          <AppContent />
      </AuthProvider>
  );
}
