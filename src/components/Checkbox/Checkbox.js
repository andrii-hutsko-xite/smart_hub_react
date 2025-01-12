import Check from "../Icons/Check";
import "./Checkbox.css";
import { useState } from "react";

function Checkbox({ label, isChecked, setFilters }) {

    const [checked, setCheckbox] = useState((isChecked) ? isChecked : false);

    function toggleCheck() {

        if (checked) {
            setCheckbox(false);

        } else {
            setCheckbox(true);
            setFilters(original => ({
                ...original,
                brands: {
                    ...original.brands,
                    filteredBrands: [...(original.brands.filteredBrands || []), label]
                }
            }))
        }

    }

    return (

        <div className="checkbox-container">
            <div className="checkbox-box" onMouseUp={() => {toggleCheck()}}>
                {
                    (checked) ? (<Check color={"#0080D8"} />) : null
                }
            </div>
            <label className="checkbox-label" onMouseUp={() => {toggleCheck()}}>{(label) ? label : "Label"}</label>
        </div>

    )

}

export default Checkbox;