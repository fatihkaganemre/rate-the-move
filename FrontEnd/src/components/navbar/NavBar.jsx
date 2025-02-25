import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import NavigationLinks from "./NavigationLinks";

function NavBar(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const handleProfileTapped = () => navigate("/profile");

    return (
        <header className="navBar p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                    <div className="d-flex align-items-center me-lg-5">
                        <img className="logo" src="/default.svg" alt="Rate the move icon" />
                    </div>
                    <NavigationLinks location={location} userType={props.userType} />
                    <UserDropdown
                        username={props.username.toUpperCase()}
                        userImage={props.userImage}
                        onProfile={handleProfileTapped}
                        onSignOut={props.onSignOut}
                    />
                </div>
            </div>
        </header>
    );
}

export default NavBar;
