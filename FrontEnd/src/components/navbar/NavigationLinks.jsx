import React from "react";
import { Link } from "react-router-dom";

function NavigationLinks({ location, userType }) {
    const menuItems = [
        { path: "/moves", label: "Moves" },
        { path: "/ratings", label: "Ratings" },
        { path: "/competitors", label: "Competitors" },
    ];

    const filteredMenuItems = userType === "competitor"
    ? menuItems.filter(item => item.path !== "/competitors")
    : menuItems;

    const isActive = (path) => location.pathname === path;

    return (
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {filteredMenuItems.map((item) => (
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
    );
}

export default NavigationLinks;
