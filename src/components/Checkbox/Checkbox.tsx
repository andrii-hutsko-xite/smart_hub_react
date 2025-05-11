import Check from "../Icons/Check";
import "./Checkbox.css";
// No longer need useState as this will be a controlled component

interface CheckboxProps {
    label: string;
    isChecked?: boolean;
    onChange?: () => void; // Add onChange to the props interface
}

function Checkbox({label, isChecked = false, onChange}: CheckboxProps) {
    // isChecked now defaults to false if not provided.
    // The component will rely entirely on this prop for its checked state.

    // This function will be called when the checkbox area is clicked.
    // It, in turn, calls the onChange prop passed from the parent component.
    const handleClick = () => {
        if (onChange) { // Check if an onChange handler was provided
            onChange(); // Call the parent's onChange handler
        }
    };

    return (
        <div className="checkbox-container">
            {/* Use the handleClick function for the event handler */}
            <div className="checkbox-box" onMouseUp={handleClick}>
                {
                    (isChecked) ? (<Check color={"#0080D8"} />) : null // Display based on the isChecked prop
                }
            </div>
            <label className="checkbox-label" onMouseUp={handleClick}>
                {(label) ? (label) : "Label"}
            </label>
        </div>

    )

}

export default Checkbox;