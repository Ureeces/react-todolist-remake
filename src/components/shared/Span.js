import React from "react";

const Span = (props) => {
    // Disables the span if conditions are met
    let spanDisabled = props.disabledButton 
    ? props.disabledClass 
    : "";

    // Sets the onClick value if present within props
    let spanOnClick = props.onClick ? props.onClick : {};

    return (
        <span
            className={`${props.className} ${spanDisabled}`}
            onClick={() => spanOnClick(props.id)}
        >{props.value}
        </span>
    )
}

export default Span;
