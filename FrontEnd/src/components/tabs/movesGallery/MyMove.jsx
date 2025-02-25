import React from "react";
import './myMove.css';

function MyMove(props) {
    return (
        <div className="myMove-container">
            <div className="myMove-content">
                <br />
                <div className="myMove-info">
                    <h5 className="myMove-title">{props.title}</h5>
                    <h6 className="myMove-description">{props.description}</h6>
                    <div className="move-date">{props.date}</div>
                </div>
            </div>
            <video className="myMove-video" controls>
                <source src={props.videoURL} type="video/mp4" />
            </video>
            <div className="removeIcon">
                <i className="fa fa-trash" aria-hidden="true"></i>
            </div>
            <div className="editIcon">
                <i className="fas fa-edit" aria-hidden="true"></i>
            </div>
        </div>
    );
}

export default MyMove;
