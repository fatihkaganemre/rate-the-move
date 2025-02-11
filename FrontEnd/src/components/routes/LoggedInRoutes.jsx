import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import MovesGallery from '../tabs/MovesGallery';
import CompetitorsGallery from '../tabs/CompetitorsGallery';
import RatingsGallery from '../tabs/RatingsGallery';
import MyMovesGallery from '../tabs/MyMovesGallery';
import Profile from '../profile/Profile';
import useUser from '../../hooks/useUser';
import Loader from '../common/Loader';

function LoggedInRoutes() {
  const location = useLocation();
  const [isCompetitor, setIsCompetitor] = useState();
  const { user, signOut, reloadUser, isLoading } = useUser();

  useEffect( () => {
    if (user) {
      setIsCompetitor(user.type === 'competitor');
    }
  }, [user]);

  return (
    <div>
      <Loader hidden={!isLoading} />
      {location.pathname !== '/profile' && (
        <NavBar
          onSignOut={signOut}
          userImage={user?.image_url || './user-placeholder.svg'}
          username={user?.name}
          userType={user?.type}
        />
      )}
      <Routes>
        <Route path="/" element={isCompetitor ? <MyMovesGallery userId={user.id} /> : <MovesGallery />} />
        <Route path="/moves" element={isCompetitor ? <MyMovesGallery userId={user.id} /> : <MovesGallery />} />
        <Route path="/ratings" element={<RatingsGallery isCompetitor={isCompetitor} />} />
        <Route path="/competitors" element={<CompetitorsGallery />} />
        <Route path="/profile" element={<Profile user={user} onRemovedAccount={signOut} onUpdate={reloadUser}/>} />
      </Routes>
    </div>
  );
}

export default LoggedInRoutes;
