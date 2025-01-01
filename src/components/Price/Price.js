import "./Price.css";

function Price({ price, usual_price, align }) {

    return (

        <div className="price-container">
            {usual_price && <p className="usual">Usually: € { usual_price }</p>}
            <p className={`main ${usual_price ? "deal" : "reg"}`}>€ { price }</p>
        </div>

    )

}

export default Price;