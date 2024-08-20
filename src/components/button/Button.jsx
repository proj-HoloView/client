import React from "react";
import { useNavigate } from "react-router-dom";

function Default(props) {
    return <button onClick={props.handleOnClick}> {props.children} </button>
}

function Leave() {
    const navigate = useNavigate();

    const handleOnClick = () => {
        localStorage.clear();
        sessionStorage.clear();

        navigate('/');
    }

    return <Default handleOnClick={handleOnClick}>Sair</Default>
}

const Button = {
    Default,
    Leave
}

export default Button;