import "./InputText.css";
import { forwardRef } from "react";

const InputText = forwardRef(({inputLabel, inputType = "text", errorText, inputPlaceholder}, inputRef) => {

    return (
        <div className="input-container" onClick={() => inputRef.current.select()}>
            {inputLabel ? (<label>{inputLabel}</label>) : null}
            <div className="input-body">
                <input
                    type={inputType}
                    ref={inputRef}
                    placeholder={inputPlaceholder ? inputPlaceholder : null}
                />
            </div>
            {(errorText) ? (<span className="error-text">{errorText}</span>) : null}
        </div>
    )

});

export default InputText;