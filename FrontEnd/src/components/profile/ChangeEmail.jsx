import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./ChangeEmail.css"; 
import InformationPopup from "../common/InformationPopup";
import useAuth from '../../hooks/useAuth';

function ChangeEmail() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [isInformationPopupOpen, setInformationPopupOpen] = useState(false);
    const handleButtonClick = () => { setIsVisible(!isVisible) };
    const handleEmailChange = (event) => { setEmail(event.target.value) };
    const { logout } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidEmail(email)) {
            changeEmail(email);
            setIsVisible(false);
        } else {
            alert(`${email} is not a valid email address.`)
        }
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    function changeEmail(email) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        };
      
        fetch('/account/email', requestOptions)
        .then(response => response.json())
        .then(() => { setInformationPopupOpen(true) })
        .catch((error) => alert(error))
    }

    const handleInformationPopupOkTap = () => {
        setInformationPopupOpen(false);
        setIsVisible(false);
        setEmail("");
        logout();
    };

    return (
        <div>
            <button onClick={handleButtonClick} className="btn btn-dark">
                {isVisible ? "Cancel" : "Change Email"}
            </button>
            <CSSTransition
                in={isVisible}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <form onSubmit={handleSubmit} className="email-form">
                    <label htmlFor="email">New Email:</label>
                    <input
                        className="email-input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </CSSTransition>
            <InformationPopup
                isOpen={isInformationPopupOpen}
                message="Email has been updated"
                onOk={handleInformationPopupOkTap}
            />
        </div>
    );
}

export default ChangeEmail;
