import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import ItemCard from '../ItemCard/ItemCard';
import "./AllProducts.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllProducts() {

    const [response, setResponse] = useState("No items found");

    useEffect(() => {
        const url = "http://localhost:3001/products";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setResponse(data);
            })
            .catch(error => console.error('Error:', error));

    }, []);
    

    return (

        <div className="App">
            <Header />
            <div className="main-content">
                <Breadcrumbs />
                <div className="secondary-content">
                    <div className='filters-plug'></div>
                    <div className='products-container-plug'>
                        <div className='sorting-plug'></div>
                        <div className='showcase-plug'>
                            {
                                Array.from(response).map((element, index) => {
                                    return (
                                        <Link to={`/all-products/product/${element.id}`} key={index}>
                                            <ItemCard itemObject={element} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )


}

export default AllProducts;