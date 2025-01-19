import "./PromoShelf.css";
import ItemCard from "../ItemCard/ItemCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function PromoShelf({ top, title, promo_name }) {

    const styles = {
        marginTop: top || "24px"
    }

    const [response, setResponse] = useState([]);
    

    useEffect(() => {
        const url = `http://localhost:3001/promos/${promo_name}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setResponse(data);
                
            })
            .catch(error => console.error('Error:', error));

    }, []);

    return (

        <section style={styles}>
            <div className="title">
                <h2>{title || "Title"}</h2>
                <Link to="/all-products">All products</Link>
            </div>
            <div className="content">
                {
                    (response) ?
                    (
                        response.map((element, index) => {
                            return (
                                <Link to={`/all-products/${element.id}`} key={index}>
                                    <ItemCard itemObject={element} key={index} />
                                </Link>
                            )
                        })
                    )
                    :
                    (
                        (
                            <p>Loading...</p>
                        )
                    )
                    
                }

            </div>
        </section>

    )

}

export default PromoShelf;