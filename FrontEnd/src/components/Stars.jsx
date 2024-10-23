import React from "react";

function Stars(props) {
    function handleChange(event) {
      props.onRated(event.target.value);
    }

    return (
      <div className="rate">
        <input onChange={handleChange} type="radio" id={`${props.id}-star5`} name="rate" value="5" />
        <label htmlFor={`${props.id}-star5`} title="text">5 stars</label>
        <input onChange={handleChange} type="radio" id={`${props.id}-star4`} name="rate" value="4" />
        <label htmlFor={`${props.id}-star4`} title="text">4 stars</label>
        <input onChange={handleChange} type="radio" id={`${props.id}-star3`} name="rate" value="3" />
        <label htmlFor={`${props.id}-star3`} title="text">3 stars</label>
        <input onChange={handleChange} type="radio" id={`${props.id}-star2`} name="rate" value="2" />
        <label htmlFor={`${props.id}-star2`} title="text">2 stars</label>
        <input onChange={handleChange} type="radio" id={`${props.id}-star1`} name="rate" value="1" />
        <label htmlFor={`${props.id}-star1`} title="text">1 star</label>
      </div>
    )
}

export default Stars;