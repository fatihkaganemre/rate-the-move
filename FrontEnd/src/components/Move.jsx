import React, { useEffect } from "react";
import Stars from "./Stars";

function Move(props) {
    return (
        <div className="move">
            <form className="move-form" action="submit">
                <h5>{props.title}</h5>
                <h6>{props.description}</h6>
                <Stars />
                <textarea type="text" placeholder="Write something.." hidden={props.isRated}/>
                <button type="submit" class="btn btn-primary" hidden={props.isRated}>Submit</button>
            </form>
            <video width="320" height="240" controls>
                <source src={props.videoURL} type="video/mp4" />
            </video>
        </div>
    )
};

export default Move;
