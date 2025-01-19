import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import useAuth from './useAuth';

function useUser() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuthContext();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/check-auth', { credentials: 'include' });
      if (!response.ok) throw new Error('Not authenticated');
      const data = await response.json();
      setIsLoggedIn(data.isLoggedIn);
      setUser(data.user);
    } catch (error) {
      clearUserData();
      navigate('/login');
      console.error('Authentication check failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      clearUserData();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const clearUserData = () => {
    setUser(null); 
    setIsLoggedIn(false); 
  };

  return {
    user,
    isLoading: user === null && !isLoggedIn, // Infer loading from context state
    isLoggedIn,
    handleSignOut,
    reloadUser: checkAuthentication, // Expose for manual reload if needed
  };
}

export default useUser;
