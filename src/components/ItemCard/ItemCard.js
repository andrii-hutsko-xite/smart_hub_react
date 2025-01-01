import "./ItemCard.css";
import Price from "../Price/Price";
import Rating from "../Rating/Rating";

function ItemCard({ itemObject }) {

    return (

        <div className="item-container">
            <img src={itemObject.image_main} alt={""} />
            <div className="details">
                <div className="item-title">
                    <Rating rating={itemObject.rating} />
                    <p className="item-name">{ itemObject.brand + " " + itemObject.model }</p>
                </div>
                <Price price={ itemObject.price } usual_price={ itemObject.usual_price }/>
            </div>
        </div>

    )

}

export default ItemCard;