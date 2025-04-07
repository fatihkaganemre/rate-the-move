import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import useAuth from './useAuth';

function useUser() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/check-auth', { credentials: 'include' });
      if (!response.ok) throw new Error('Not authenticated');
      const data = await response.json();
      setUser(data.user);
      setIsLoggedIn(data.isLoggedIn);
    } catch (error) {
      clearUserData();
      console.error('Authentication check failed:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  const signOut = async () => {
    try {
      await logout();
      clearUserData();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const clearUserData = () => {
    setUser(null); 
    setIsLoggedIn(false); 
    setIsLoading(false);
  };

  return {
    user,
    isLoading: isLoading, // Infer loading from context state
    isLoggedIn,
    signOut,
    reloadUser: checkAuthentication, // Expose for manual reload if needed
  };
}

export default useUser;
