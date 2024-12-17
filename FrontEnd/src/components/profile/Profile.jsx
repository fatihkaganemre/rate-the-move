import React, { useState } from "react";
import './profile.css'
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ConfirmationPopup from "../common/ConfirmationPopup";

function Profile(props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const confirmRemoveAccount = () => {
        setIsPopupOpen(false);
        removeAccount();
    };
    const handleRemoveAccount = () => { setIsPopupOpen(true) };
    const cancelRemoveAccount = () => { setIsPopupOpen(false) };

    function removeAccount() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          };
      
          fetch('/account', requestOptions)
            .then(response => response.json())
            .then(() => { 
              props.onRemovedAccount();
            })
            .catch((error) => alert(error))
    }

    function changeEmail(email) {

    }

    return (
        <div className="mainConteiner">
            <div className="profilePhotoName">
                <h2 className="userName">{props.username}</h2>
                <div className="profileImageContainer">
                    <img
                        src={props.image_url}
                        alt="Profile image"
                        className="profileImage"
                        referrerPolicy="no-referrer"
                    />
                    <div className="addIcon">
                        <i className="fa fa-camera" aria-hidden="true"></i>
                    </div>
                </div>
                <h5 className="featurette-heading fw-normal lh-1">{props.email}</h5>
            </div>
            <div className="profileData">
                <h1>Settings</h1>
                <ChangeEmail onSubmit={changeEmail}/>
                <ChangePassword/>
                <button className="btn btn-danger" onClick={handleRemoveAccount}>Remove Account</button>
            </div>

            <ConfirmationPopup
                isOpen={isPopupOpen}
                message="Are you sure?"
                description="Do you really want to remove your account? This action cannot be undone."
                onConfirm={confirmRemoveAccount}
                onCancel={cancelRemoveAccount}
            />
        </div>
    )
}

export default Profile;

