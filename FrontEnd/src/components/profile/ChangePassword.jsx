import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./ChangePassword.css";
import InformationPopup from "../common/InformationPopup";
import useAuth from '../../hooks/useAuth';

function ChangePassword() {
    const [isVisible, setIsVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isInformationPopupOpen, setInformationPopupOpen] = useState(false);
    const { logout } = useAuth();

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
        changePassword();
    };

    function changePassword() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPassword, newPassword })
        };
      
        fetch('/api/account/password', requestOptions)
        .then(response => response.json())
        .then(() => { setInformationPopupOpen(true) })
        .catch((error) => alert(error))
    };

    const handleInformationPopupOkTap = () => {
        setInformationPopupOpen(false);
        setIsVisible(false);
        setOldPassword("");
        setNewPassword("");
        logout();
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
            <InformationPopup
                isOpen={isInformationPopupOpen}
                message="Password has been changed"
                onOk={handleInformationPopupOkTap}
            />
        </div>
    );
}

export default ChangePassword;
