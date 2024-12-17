import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./ChangePassword.css";

function ChangePassword() {
    const [isVisible, setIsVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);

        

        // Add validation and API call logic here
    };

    return (
        <div>
            <button onClick={handleToggle} className="btn btn-dark">
                {isVisible ? "Cancel" : "Change Password"}
            </button>
            <CSSTransition
                in={isVisible}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <form onSubmit={handleSubmit} className="password-form">
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={handleOldPasswordChange}
                        required
                    />

                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                    />

                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </CSSTransition>
        </div>
    );
}

export default ChangePassword;
