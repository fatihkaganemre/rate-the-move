import React from "react";

function UserDropdown({ username, userImage, onProfile, onSignOut }) {
    return (
        <div className="dropdown text-end">
            <h6 className="mb-1">Hello, {username}</h6>
            <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img
                    src={userImage || "./user-placeholder.svg"}
                    alt="profile icon"
                    width="50"
                    height="50"
                    className="rounded-circle"
                    referrerPolicy="no-referrer"
                />
            </a>
            <ul className="dropdown-menu text-small">
                <li>
                    <button onClick={onProfile} className="dropdown-item">
                        Profile
                    </button>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <button onClick={onSignOut} className="dropdown-item">
                        Sign out
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default UserDropdown;
