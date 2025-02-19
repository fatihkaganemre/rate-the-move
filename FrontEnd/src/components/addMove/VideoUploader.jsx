import React, { useState } from "react";
import "./VideoUploader.css"; // Import external CSS

const VideoUploader = (props) => {
    const [videoPreview, setVideoPreview] = useState(null);

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setVideoPreview(videoURL);
            props.onUpload(file);
        }
    };

    return (
        <div className="video-uploader">
            <label>Upload a video</label>

            {props.isLoading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Processing video...</p>
                </div>
            ) : (
                <>
                    <label className="upload-button">
                        Choose from Gallery
                        <input
                            type="file"
                            accept="video/*"
                            style={{ display: "none" }}
                            onChange={handleVideoChange}
                        />
                    </label>
                    <label className="upload-button">
                        Record Video
                        <input
                            type="file"
                            accept="video/*"
                            capture="environment"
                            style={{ display: "none" }}
                            onChange={handleVideoChange}
                        />
                    </label>
                    {videoPreview && (
                        <video controls width="100%" className="video-preview">
                            <source src={videoPreview} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </>
            )}
        </div>
    );
};

export default VideoUploader;
