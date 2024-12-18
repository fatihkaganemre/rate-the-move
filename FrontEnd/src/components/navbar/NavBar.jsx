import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import NavigationLinks from "./NavigationLinks";

function NavBar(props) {
    const location = useLocation();
    const menuItems = [
        { path: "/moves", label: "Moves" },
        { path: "/ratings", label: "Ratings" },
        { path: "/competitors", label: "Competitors" }, // Fixed typo
    ];
    const isActive = (path) => location.pathname === path;

    return (
        <header className="navBar p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                    {/* Logo */}
                    <div className="d-flex align-items-center me-lg-5">
                        <img className="logo" src="/default.svg" alt="Rate the move icon" />
                    </div>
                    <NavigationLinks location={location} />
                    <UserDropdown
                        username={props.username}
                        userImage={props.userImage}
                        onProfile={props.onProfile}
                        onSignOut={props.onSignOut}
                    />
                </div>
            </div>
        </header>
    );
}

export default NavBar;
