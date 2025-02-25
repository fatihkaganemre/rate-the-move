import React from "react";
import "./rating.css";

function Rating(props) {
    function constructRatedStars(rate) {
        return [...Array(rate)].map((_, index) => (
            <span key={index} className="fa fa-star checked ratedStar" />
        ));
    }

    function renderRating(rating) { 
        return (
            <div key={rating.id} className="comment">
                <div className="name">{rating.coachFullName}</div>
                <div>{constructRatedStars(rating.rate)}</div>
                <div>{rating.comment}</div>
            </div>
        );
    }

    return (
        <div className="move">
            <form className="form">
                <div>
                    <div className="user">
                        <img
                            src={props.userImage}
                            alt="mdo"
                            width="50"
                            height="50"
                            className="rounded-circle"
                        />
                        <h5>{props.userName}</h5>
                    </div>
                    <div className="video-info">
                        <h5>{props.move.title}</h5>
                        <h6>{props.move.description}</h6>
                        <div className="move-date">{props.move.date}</div>
                    </div>
                </div>
                <div className="line"></div>
                <div className="rateAndComment">{props.rates.map(rate => renderRating(rate))}</div>
            </form>
            <video className="video" controls>
                <source src={props.move.videoURL} type="video/mp4" />
            </video>
        </div>
    );
}

export default Rating;
