import "./Button.css";
import Icon from '../Icon/Icon';

function Button({ buttonClass = null, type, text, iconLeft = null, iconRight = null, onClickAction, passedStyle }) {

    const button_types = {
        "primary": "button-type-primary",
        "secondary": "button-type-secondary",
        "framed": "button-type-framed",
        "text": "button-type-text"
    }

    let paddingLeft = 24;
    let paddingRight = 24;

    switch (true) {
        case (text && !iconLeft && !iconRight):
            // text only
            paddingLeft = 24;
            paddingRight = 24;
            break;
        case (text && iconLeft && !iconRight):
            //text + iconLeft
            paddingLeft = 12;
            paddingRight = 24;
            break;
        case (text && !iconLeft && iconRight):
            //text + iconRight
            paddingLeft = 24;
            paddingRight = 12;
            break;
        case (text && iconLeft && iconRight):
            //text + both icons
            paddingLeft = 12;
            paddingRight = 12;
            break;
        case (!text && iconLeft && !iconRight):
            //iconLeft only
            paddingLeft = 12;
            paddingRight = 12;
            break;
        case (!text && !iconLeft && iconRight):
            //iconRight only
            paddingLeft = 12;
            paddingRight = 12;
            break;
        case (!text && iconLeft && iconRight):
            //both icons
            paddingLeft = 12;
            paddingRight = 12;
            break;
    }

    let iconColor;

    switch (type) {
        case "primary":
            iconColor = "#FCFCFC";
            break;
        case "secondary":
            iconColor = "#000000";
            break;
    }

    // if (text)
    // options:
        // text, text + iconLeft, text + iconRight, text + both icons, iconLeft, iconRight, both icons 

    return (
        <button
            className={`button-container ${button_types[type]} padding-left-${paddingLeft} padding-right-${paddingRight} ${buttonClass}`}
            onClick={onClickAction}
            style={passedStyle}
        >
            {((iconLeft) ? (
                <Icon
                    name={iconLeft}
                    color={iconColor}
                />
            ) : null)}
            {text}
            {((iconRight) ? (
                <Icon
                    name={iconRight}
                    color={iconColor}
                />
            ) : null)}
        </button>
    )

}

export default Button;