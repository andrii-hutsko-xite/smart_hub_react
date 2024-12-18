import "./ItemCard.css";
import Price from "../Price/Price";

function ItemCard({ itemObject }) {

    return (

        <div className="item-container">
            <img src={ itemObject.image_main } alt={""} />
            <div className="details">
                <div className="title">
                    <div className="rating"></div>
                    <h2>{ itemObject.brand + " " + itemObject.model }</h2>
                </div>
                <Price price={ itemObject.price } />
            </div>
        </div>

    )

}

export default ItemCard;