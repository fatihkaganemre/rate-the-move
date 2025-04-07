import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton() {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1); // or customize target route

    return (
        <div className="back-button" onClick={handleBack}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </div>
    );
}

export default BackButton;
