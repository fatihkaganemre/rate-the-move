import React, { useState , useRef } from "react";
import './profile.css'
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ConfirmationPopup from "../common/ConfirmationPopup";

function Profile(props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(props.user.image_url || "./user-placeholder.svg");
    const fileInputRef = useRef(null);

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
      
        fetch('/api/account', requestOptions)
        .then(response => response.json())
        .then(() => { props.onRemovedAccount() })
        .catch((error) => alert(error))
    }

    const handleImageClick = () => {
        fileInputRef.current.click(); // Open file input dialog
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Show preview
            };
            reader.readAsDataURL(file);
            uploadImage(file);
        }
    };

    const uploadImage = (file) => {
        const formData = new FormData();
        formData.append("profileImage", file);

        fetch("/api/upload-profile-image", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Image uploaded successfully!");
                props.onUpdate();
            } else {
                alert("Failed to upload image.");
            }
        })
        .catch(error => {
            alert("An error occurred while uploading.");
        });
    };

    return (
        <div className="mainConteiner">
            <div className="profilePhotoName">
                <h2 className="userName">{`${props.user.name.toUpperCase()} ${props.user.surname.toUpperCase()}`}</h2>
                <div className="profileImageContainer">
                    <img
                        src={imagePreview}
                        alt="Profile image"
                        className="profileImage"
                        referrerPolicy="no-referrer"
                    />
                    <div className="addIcon">
                        <i onClick={handleImageClick} className="fa fa-camera" aria-hidden="true"></i>
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                <h5 className="featurette-heading fw-normal lh-1">{props.user.email}</h5>
            </div>
            <div className="profileData">
                <h1>Settings</h1>
                { !props.user.isThirdPartyLogin && <ChangeEmail />}
                { !props.user.isThirdPartyLogin && <ChangePassword/>}
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

