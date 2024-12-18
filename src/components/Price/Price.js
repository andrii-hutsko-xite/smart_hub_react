


function Price({ price, usual_price }) {

    return (

        <div className="price-container">
            {usual_price && <p>Usually: €{ usual_price }</p>}
            <p>€{ price }</p>
        </div>

    )

}

export default Price;