import React from "react";
import VideoPlayer from "../../common/VideoPlayer";
import './myMove.css';

function MyMove(props) {
    const edit = () => { props.onEdit(props.id) }
    const remove = () => { props.onRemove(props.id) }

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
            <VideoPlayer src={props.videoURL} />
            <div>
                <div onClick={remove} className="removeIcon">
                    { props.isRemoving ? (
                        <div className="loading-spinner">
                            <i className="fa fa-spinner fa-spin"></i>
                        </div>
                    ) : (
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    )}
                </div>

                <div onClick={edit} className="editIcon">
                    <i className="fa fa-edit" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );
}

export default MyMove;
