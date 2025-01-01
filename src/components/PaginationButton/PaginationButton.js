import "./PaginationButton.css";

function PaginationButton({ number, current, onClick }) {

    return (

        <div
            className={`pagination-button-base ${current ? "pagination-button-current" : "pagination-button-other"}`}
            onClick={onClick}
        >{number}</div>

    )

}

export default PaginationButton;