import React from "react";
import Stars from "./Stars";

function Move(props) {
    function constructRatedStars() {
        return [...Array(props.rate)].map((x) => <span className="fa fa-star checked" id="ratedStar" />) 
    }

    function handleFormChange(event) {
        props.onMoveFormChange(event, props.id);
    }

    function handleSubmit(event) {
        props.onSubmitRating(event, props.id);
    }

    return (
        <div className="move">
            <form onSubmit={handleSubmit} onChange={handleFormChange} className="move-form">
                <h5>{props.title}</h5>
                <h6>{props.description}</h6>
                <div> { props.isRated ? constructRatedStars() : <Stars/> } </div>
                <textarea type="text" placeholder="Write something.." hidden={props.isRated} name="comment"/>
                <button type="submit" className="btn btn-primary" hidden={props.isRated}>Submit</button>
                <div className="my-comment" hidden={!props.isRated}>Me: {props.comments && props.comments[0].comment}</div>
            </form>
            <video width="320" controls>
                <source src={props.videoURL} type="video/mp4" />
            </video>
        </div>
    )
};

export default Move;
