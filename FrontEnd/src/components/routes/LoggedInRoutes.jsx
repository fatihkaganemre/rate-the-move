import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import MovesGallery from '../tabs/MovesGallery';
import CompetitorsGallery from '../tabs/CompetitorsGallery';
import RatingsGallery from '../tabs/RatingsGallery';
import MyMovesGallery from '../tabs/MyMovesGallery';
import Profile from '../profile/Profile';
import useUser from '../../hooks/useUser';
import Loader from '../common/Loader';
import AddMove from '../addMove/AddMove';

function LoggedInRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCompetitor, setIsCompetitor] = useState();
  const { user, signOut, reloadUser, isLoading } = useUser();
  const navigateToAddMove = () => { navigate("/addMove")}
  const navigateToMoves = () => { navigate("/moves") }

  useEffect( () => {
    if (user) {
      setIsCompetitor(user.type === 'competitor');
    }
  }, [user]);

  return (
    <div>
      <Loader hidden={!isLoading} />
      { (location.pathname !== '/profile' && location.pathname !== '/addMove') && (
        <NavBar
          onSignOut={signOut}
          userImage={user?.image_url || './user-placeholder.svg'}
          username={user?.name}
          userType={user?.type}
        />
      )}
      <Routes>
        <Route path="/" element={isCompetitor ? <MyMovesGallery userId={user.id} /> : <MovesGallery />} />
        <Route path="/moves" element={isCompetitor ? <MyMovesGallery userId={user.id} onAddMove={navigateToAddMove} /> : <MovesGallery />} />
        <Route path="/ratings" element={<RatingsGallery isCompetitor={isCompetitor} />} />
        <Route path="/competitors" element={<CompetitorsGallery />} />
        <Route path="/profile" element={<Profile user={user} onRemovedAccount={signOut} onUpdate={reloadUser}/>} />
        <Route path="/addMove" element={<AddMove onUpload={navigateToMoves} />} />
      </Routes>
    </div>
  );
}

export default LoggedInRoutes;
