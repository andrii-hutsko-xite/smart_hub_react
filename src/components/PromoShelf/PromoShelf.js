import "./PromoShelf.css";
import ItemCard from "../ItemCard/ItemCard";
import { Link } from "react-router-dom";

function PromoShelf({ top, title }) {

    const styles = {
        marginTop: top || "24px"
    }

    return (

        <section style={styles}>
            <div className="title">
                <h2>{title || "Title"}</h2>
                <Link to="/all-products">
                    <a href="./">All products</a>
                </Link>
            </div>
            <div className="content">
                <ItemCard itemObject={{}} />
                <ItemCard itemObject={{}} />
                <ItemCard itemObject={{}} />
                <ItemCard itemObject={{}} />
                <ItemCard itemObject={{}} />

            </div>
        </section>

    )

}

export default PromoShelf;