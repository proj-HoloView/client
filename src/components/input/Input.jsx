import React from "react";

function Default(props) {
    return <input style={
        { border: `1px solid ${props.borderColor || 'black'}` }
    }
        disabled={props.disabled}
        type={props.type}
        value={props.value}
        onInput={props.handleOnInput}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        name={props.name} />
}

function Label(props) {
    return (
        <div style={{
            display: 'flex',
            gap: props.labelGap,
            flexDirection: props.vertical ? 'column' : 'row'
        }}>
            <label>{props.label}</label>
            <Default
                borderColor={props.borderColor}
                disabled={props.disabled}
                type={props.type}
                value={props.value}
                onInput={props.onInput}
                placeholder={props.placeholder}
                handleOnInput={props.handleOnInput}
                maxLength={props.maxLength}
                name={props.name} />
        </div>
    );
}

const Input = {
    Default,
    Label
}

export default Input;