import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

function LoggedOutRoutes() {
  const { user } = useUser();
  const { register, login, logout } = useAuth();
  const navigate = useNavigate();
  const handleRegisterTapped = () => { navigate('/register'); };

  const handleCancelRegistration = async () => {
    if (user) {
      try {
        await logout();
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    navigate('/login');
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login onSubmit={login} onRegister={handleRegisterTapped} />} />
        <Route path="/login" element={<Login onSubmit={login} onRegister={handleRegisterTapped} />} />
        <Route path="/register" element={<Register onSubmit={register} onCancel={handleCancelRegistration} user={user} />} />
      </Routes>
    </div>
  );
}

export default LoggedOutRoutes;
