import React from "react";

function Loader(props) {
    return (
        <div hidden={props.hidden} className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
    )
}

export default Loader;