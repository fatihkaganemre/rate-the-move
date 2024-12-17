import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar(props) {
    const location = useLocation();
    const menuItems = [
        { path: "/moves", label: "Moves" },
        { path: "/ratings", label: "Ratings" },
        { path: "/competitors", lablel: "Competitors" },
    ];
    const isActive = (path) => location.pathname === path;

    return (
        <header className="navBar p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <img className="logo" src="/default.svg" alt="Rate the move icon" />
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        {menuItems.map((item) => (
                            <li key={item.path} className="nav-item px-2">
                                <Link
                                    className={`nav-link px-2 ${isActive(item.path) ? "link-secondary" : "link-body-emphasis"}`}
                                    to={item.path}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="dropdown text-end">
                        <h6>Hello, {props.username}</h6>
                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img 
                                src={props.userImage || "./user-placeholder.svg"} 
                                alt="profile icon" 
                                width="50" 
                                height="50" 
                                className="rounded-circle" 
                                referrerPolicy="no-referrer" 
                            />
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><button onClick={props.onProfile} className="dropdown-item">Profile</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button onClick={props.onSignOut} className="dropdown-item">Sign out</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;
