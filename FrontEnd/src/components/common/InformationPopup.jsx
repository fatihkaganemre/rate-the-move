import React from "react";
import "./popup.css";

function InformationPopup({ 
    message,
    description,
    onOk,
    isOpen
}) {
    if (!isOpen) return null;

    return (
        <div className="popupOverlay">
            <div className="popupContainer">
                <h3>{message}</h3>
                {description && <p>{description}</p>}
                <div className="popupActions">
                    <button className="btn btn-secondary" onClick={onOk}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InformationPopup;
