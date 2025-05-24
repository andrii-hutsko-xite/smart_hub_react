import "./InputText.css";
import { forwardRef } from "react";

const InputText = forwardRef(({inputLabel, inputType, errorText}, inputRef) => {

    function fireSelection() {

        inputRef.current.select();
        
    }

    return (
        <div className="input-container" onClick={fireSelection}>
            <label>{inputLabel}</label>
            <div className="input-body">
                <input type={inputType} ref={inputRef} />
            </div>
            {(errorText) ? (<span className="error-text">{errorText}</span>) : null}
        </div>
    )

});

export default InputText;