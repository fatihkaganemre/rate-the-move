import React from 'react';
import Loader from '../components/common/Loader';
import LoggedInRoutes from '../components/routes/LoggedInRoutes';
import LoggedOutRoutes from '../components/routes/LoggedOutRoutes';
import useUser from '../hooks/useUser';

function AppContent() {
  const { isLoading, isLoggedIn } = useUser();

  if ((isLoading || isLoggedIn === null)) {
    return <Loader />;
  }
  
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
}

export default AppContent;
