import "./Button.css";

function Button({ buttonClass = null, type, text, iconLeft, iconRight, onClickAction, passedStyle }) {

    const button_types = {
        "primary": "button-type-primary",
        "secondary": "button-type-secondary",
        "framed": "button-type-framed"
    }

    return (
        <button
            className={`button-container ${button_types[type]} ${(text) ? "is-text" : "no-text"} ${buttonClass}`}
            onClick={onClickAction}
            style={passedStyle}
        >
            {iconLeft}
            {text}
            {iconRight}
        </button>
    )

}

export default Button;