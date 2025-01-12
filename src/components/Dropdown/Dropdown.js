import "./Dropdown.css";
import { useState } from "react";

function Dropdown({ setSorting }) {

    const [dropdownOpen, setDropdown] = useState(false);
    const [sortingMode, setSortingMode] = useState("Popularity");

    function toggleDroplist(state) {

        if (state) {

            return (

                <div className="dropdown-droplist">
                    <div className="dropdown-droplist_option" onClick={() => {setSorting("popularity"); setDropdown(false); setSortingMode("Popularity")}}>Popularity</div>
                    <div className="dropdown-droplist_option" onClick={() => {setSorting("price low to high"); setDropdown(false); setSortingMode("Price low to high")}}>Price low to high</div>
                    <div className="dropdown-droplist_option" onClick={() => {setSorting("price high to low"); setDropdown(false); setSortingMode("Price high to low")}}>Price high to low</div>
                    <div className="dropdown-droplist_option" onClick={() => {setSorting("rating"); setDropdown(false); setSortingMode("Rating")}}>Rating</div>
                </div>

            )

        }

    }

    return (

        <div className="dropdown-container">
            <label>Sort by</label>
            <div className="dropdown-button" onClick={() => {setDropdown(!dropdownOpen)}}>
                {sortingMode}
                <img src="/media/icons/arrow_drop_down.svg" />
            </div>
            {
                toggleDroplist(dropdownOpen)
            }
            
        </div>

    )

}

export default Dropdown;