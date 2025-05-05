import PaginationButton from "../PaginationButton/PaginationButton";
import "./PaginationBox.css";

function PaginationBox({ total, current_page, setPage } : {total: number, current_page: number, setPage: Function}) {

    const page_number = Math.ceil(total / 16);

    const buttons = [];

    for (let i = 0; i < page_number; i++) {
        const buttonObject = {
            number: (i + 1),
            current: (current_page === (i + 1)) ? true : false
        }
        buttons.push(buttonObject);
    }

    return (

        <div className="pagination-box">

            {
                buttons.map((element, index) => {

                    return (

                        <PaginationButton
                            number={element.number}
                            current={element.current}
                            key={index}
                            onClick={() => { setPage(element.number) }}
                        />

                    )

                })
            }

        </div>

    )

}

export default PaginationBox;