import "./PromoShelf.css";
import ItemCard from "../ItemCard/ItemCard";

function PromoShelf({ top, title }) {

    const styles = {
        marginTop: top || "24px"
    }

    return (

        <section style={styles}>
            <div className="title">
                <h2>{title || "Title"}</h2>
                <a href="./">All products</a>
            </div>
            <div className="content">
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />

            </div>
        </section>

    )

}

export default PromoShelf;