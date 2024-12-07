import React from "react";
import './profile.css'

function Profile(props) {
    return (
        <div className="mainConteiner">
            <div className="profilePhotoName">
                <div>
                    <img className="profileImage" src={props.imageURL} alt="mdo"/>
                    <a href="#" onClick={props.onAddImage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="addIcon bi bi-plus-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                        </svg>
                    </a>
                </div>
                <h2 className="userName">{props.userName}</h2>
                <h5 className="featurette-heading fw-normal lh-1">{props.email}</h5>
            </div>
            <div className="profileData">
                <h1>Settings</h1>
                <button className="btn btn-dark">Change email</button>
                <button className="btn btn-dark">Change password</button>
                <button className="btn btn-danger">Remove account</button>
            </div>
        </div>
    )
}

export default Profile;

