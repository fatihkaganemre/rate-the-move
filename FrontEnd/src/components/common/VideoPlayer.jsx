import React from "react";
import './videoPlayer.css';

const VideoPlayer = ({ src }) => {
    return (
        <div className="video-wrapper">
            <video className="video" controls>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
