import "./Button.css";

function Button({ type, text, icon_left, icon_right }) {

    const button_types = {
        "primary": "button-type-primary",
        "secondary": "button-type-secondary",
        "framed": "button-type-framed"
    }

    return (
        <button className={`button-container ${button_types[type]} ${(text) ? "is-text" : "no-text"}`}>
            {text}
            {icon_right}
        </button>
    )

}

export default Button;