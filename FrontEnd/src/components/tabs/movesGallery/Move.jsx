import React from "react";
import Stars from "../../common/Stars";
import VideoPlayer from "../../common/VideoPlayer";
import './move.css';

function Move(props) {
    function handleSubmit(event) {
        props.onSubmitRating(event, props.id);
    }

    function handleRating(rate) {
        props.onRated(rate, props.id);
    }

    return (
        <div className="move">
            <VideoPlayer src={props.videoURL} />
            <form disabled={props.isSubmitting} onSubmit={handleSubmit} className="form">
                <div>
                    <div className="user">
                        <img src={props.userImage} alt="mdo" width="50" height="50" className="rounded-circle" />
                        <h5>{props.userName}</h5>
                    </div>
                    <div className="video-info">
                        <h5>{props.title}</h5>
                        <h6>{props.description}</h6>
                        <div className="move-date">{props.date}</div>
                    </div>
                </div>
                <div> {  <Stars id={props.id} onRated={handleRating} /> } </div>
                <textarea type="text" placeholder="Write something.." hidden={props.rate !== undefined} name="comment"/>
                <button disabled={props.isSubmitting} type="submit" className="btn btn-primary submit-btn " hidden={props.rate !== undefined}>
                    {props.isSubmitting ? (<span className="loader"></span>) : "Submit"}
                </button>
            </form>
        </div>
    )
};

export default Move;
