import React from "react";
import "./popup.css";

function ConfirmationPopup({ 
    message,
    description,
    onConfirm,
    onCancel,
    isOpen
}) {
    if (!isOpen) return null;

    return (
        <div className="popupOverlay">
            <div className="popupContainer">
                <h3>{message}</h3>
                {description && <p>{description}</p>}
                <div className="popupActions">
                    <button className="btn btn-danger" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPopup;
