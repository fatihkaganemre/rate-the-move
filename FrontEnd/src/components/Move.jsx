import React from "react";
import Stars from "./Stars";

function Move(props) {
    function constructRatedStars() {
        return [...Array(props.rate)].map((x, index) => <span key={index} className="fa fa-star checked" id="ratedStar" />) 
    }

    function handleSubmit(event) {
        props.onSubmitRating(event, props.id);
    }

    function handleRating(rate) {
        props.onRated(rate, props.id);
    }

    return (
        <div className="move">
            <form disabled={props.isSubmitting} onSubmit={handleSubmit} className="move-form">
                <h5>{props.title}</h5>
                <h6>{props.description}</h6>
                <div className="move-date">{props.date}</div>
                <div> { props.isRated ? constructRatedStars() : <Stars id={props.id} onRated={handleRating} /> } </div>
                <textarea type="text" placeholder="Write something.." hidden={props.isRated} name="comment"/>
                <button disabled={props.isSubmitting} type="submit" className="btn btn-primary" hidden={props.isRated}>Submit</button>
                <div className="my-comment" hidden={!props.isRated}>Me: {props.comments && props.comments[0].comment}</div>
            </form>
            <video width="320" controls>
                <source src={props.videoURL} type="video/mp4" />
            </video>
        </div>
    )
};

export default Move;
