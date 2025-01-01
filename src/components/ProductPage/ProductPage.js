import "./ProductPage.css";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Gallery from "../Gallery/Gallery";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Price from "../Price/Price";
import Rating from "../Rating/Rating";
import Button from "../Button/Button";
import IconShoppingCart from "../Icons/ShoppingCart";
import Favourite from "../Icons/Favourite";

function ProductPage() {
    
    const location = useLocation();

    const product_id = location.pathname.split("/")[2];    
    

    // console.log(product_id);

    const [info_response, setInfoResponse] = useState("No items found");

    const [imgs_response, setImgsResponse] = useState([]);

    useEffect(() => {

        const url = `http://localhost:3001/product-info/${product_id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setInfoResponse(data);
            })
            .catch(error => console.error('Error:', error));

    }, []);

    useEffect(() => {

        const url = `http://localhost:3001/product-imgs/${product_id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setImgsResponse(Object.values(data));
            })
            .catch(error => console.error('Error:', error));

    }, []);

    const product_name = info_response.brand + " " + info_response.model;

    return (

        <div className="App">
            <Header />
            <div className="main-content">
                <Breadcrumbs name={product_name} />
                <div className="product-top-details">
                    <h1>{product_name}</h1>
                    <Price price={info_response.price} usual_price={info_response.usual_price} />
                </div>
                <div className="artikul-and-reviews">
                    <p>Art.-Nr: {info_response.id}</p>
                    <Rating rating={info_response.rating}/>
                </div>
                <div className="product-double-container">
                    <Gallery images={imgs_response}/>
                    <div className="product-right-column">
                        <div className="product-actions">
                            <Button type="primary" text="Add to cart" icon_right={<IconShoppingCart color={"#FCFCFC"} />} />
                            <Button type="secondary" icon_right={<Favourite color={"#000000"} />} />
                        </div>
                        <div className="product-specs-container">
                            <h2>Specifications</h2>
                            <div className="product-specs-info">
                                <div className="product-specs-info-box">
                                    <h3>Display</h3>
                                    <table className="product-specs-info-table">
                                        <tr>
                                           <td>Size</td>
                                           <td>6.1"</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {(imgs_response.length !== 0) ? <Gallery images={imgs_response}/> : null} */}
            </div>
        </div>
        
    )    

}

export default ProductPage;