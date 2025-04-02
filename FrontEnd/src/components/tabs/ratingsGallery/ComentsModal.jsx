import React from "react";
import "./commentsModal.css";

function CommentsModal({ comments, onClose }) {
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={onClose}>
                    &times;
                </span>
                <h3>All Comments</h3>
                <div className="modal-comments">
                    {comments.length > 0 ? (
                        comments.map((rating, index) => (
                            <div className="comment" key={index}>
                                <div className="name">{rating.coachFullName}</div>
                                <div className="stars">
                                    {Array.from({ length: rating.rate }).map((_, i) => (
                                        <span key={i} className="fa fa-star checked"></span>
                                    ))}
                                </div>
                                <div>{rating.comment}</div>
                            </div>
                        ))
                    ) : (
                        <p>No comments available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommentsModal;
