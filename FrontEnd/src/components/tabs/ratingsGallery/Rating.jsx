import React, { useState } from "react";
import CommentsModal from "./ComentsModal";
import "./rating.css";

function Rating(props) {
    const [showModal, setShowModal] = useState(false);

    function renderRating(rating) { 
        return (
            <div className="comment" key={rating.id}>
                <div className="name">{rating.coachFullName}</div>
                <div className="stars">
                    {Array.from({ length: rating.rate }).map((_, i) => (
                        <span key={i} className="fa fa-star checked ratedStar"></span>
                    ))}
                </div>
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
                            src={props.imageURL || "./user-placeholder.svg"}
                            alt="User Avatar"
                            width="50"
                            height="50"
                            className="rounded-circle"
                        />
                        <h5>{props.userName}</h5>
                    </div>
                    <div className="video-info">
                        <h5>{props.move.title}</h5>
                        <h6>{props.move.description}</h6>
                        <div className="move-date">{props.date}</div>
                    </div>
                </div>
                <div className="line"></div>

                {/* Show only the first 2 comments */}
                <div className="rateAndComment">
                    {props.rates.slice(0, 2).map(renderRating)}
                </div>

                {/* View More Button (Left-aligned) */}
                {props.rates.length > 2 && (
                    <button
                        type="button"
                        className="view-more-btn"
                        onClick={() => setShowModal(true)}
                    >
                        View More Comments
                    </button>
                )}
            </form>

            <video className="video" controls>
                <source src={props.move.videoURL} type="video/mp4" />
            </video>

            {/* Show Comments Modal when clicked */}
            {showModal && <CommentsModal comments={props.rates} onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default Rating;
