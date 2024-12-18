import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./ChangeEmail.css"; // Custom CSS for animations

function ChangeEmail(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleButtonClick = () => { setIsVisible(!isVisible) };
    const handleEmailChange = (event) => { setEmail(event.target.value) };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidEmail(email)) {
            props.onSubmit(email);
            setIsVisible(false);
        } else {
            alert(`${email} is not a valid email address.`)
        }
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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
        </div>
    );
}

export default ChangeEmail;
