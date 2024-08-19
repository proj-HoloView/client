import React from "react";

function Default(props) {
    return <button onClick={props.handleOnClick}> {props.children} </button>
}

const Button = {
    Default
}

export default Button;