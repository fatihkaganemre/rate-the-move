import React, { useEffect, useState } from "react";
import VideoUploader from "./VideoUploader";
import "./addMove.css"; 

function AddMove(props) {
    const [input, setInput] = useState({ title: "", description: "", videoFile: null });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (props.move) {
            setInput({ title: props.move.title, description: props.move.description, videoFile: null });
        }
    }, []);

    function handleOnChange(event) {
        const { name, value } = event.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    }

    function handleOnSelectedVideo(videoFile) {
        setInput(prevInput => ({
            ...prevInput,
            videoFile: videoFile
        }));
    }

    const uploadVideo = () => {
        if (!input.videoFile || !input.title.trim() || !input.description.trim()) {
            alert("Please fill all fields before uploading.");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("videoFile", input.videoFile);
        formData.append("title", input.title);
        formData.append("description", input.description);

        fetch("/api/upload-video", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Video uploaded successfully!");
                props.onUpload();
                setInput({ title: "", description: "", videoFile: null });
            } else {
                alert("Failed to upload video.");
            }
            setIsLoading(false);
        })
        .catch(() => {
            alert("An error occurred while uploading.");
            setIsLoading(false);
        });
    };

    const updateMove = () => {
        if (!input.title.trim() || !input.description.trim()) {
            alert("Please fill all fields before submitting.");
            return;
        }

        setIsLoading(true);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: input.title,
                description: input.description,
            }),
        };

        fetch(`/api/moves/${props.move.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Move updated successfully!");
                    props.onUpload();
                    setInput({ title: "", description: "", videoFile: null });
                } else {
                    alert("Failed to update.");
                }
                setIsLoading(false);
            })
            .catch(() => {
                alert("An error occurred while updating.");
                setIsLoading(false);
            });
    };

    const renderVideoSection = () => (
        props.move ? (
            <video className="addMove-video" controls>
                <source src={props.move.videoURL} type="video/mp4" />
            </video>
        ) : (
            <VideoUploader onUpload={handleOnSelectedVideo} />
        )
    );

    const renderSubmitButton = () => {
        return (
            <>
                <button 
                    disabled={isLoading || !input.title.trim() || !input.description.trim() || (!props.move && !input.videoFile)} 
                    type="button" 
                    onClick={props.move ? updateMove : uploadVideo} 
                    className="btn btn-dark upload-btn"
                >
                    {isLoading ? "Processing..." : props.move ? "Update Move" : "Upload"}
                </button>
            </>
        )
    }

    return (
        <div className="add-move-container">
            <div className="add-move-card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                id="title" 
                                type="text" 
                                className="form-control" 
                                name="title" 
                                placeholder="Enter title" 
                                value={input.title}
                                onChange={handleOnChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                type="text" 
                                className="form-control" 
                                name="description" 
                                placeholder="Enter description" 
                                value={input.description}
                                onChange={handleOnChange}
                                required 
                            />
                        </div>
                        { renderVideoSection() }
                        { renderSubmitButton() }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddMove;
