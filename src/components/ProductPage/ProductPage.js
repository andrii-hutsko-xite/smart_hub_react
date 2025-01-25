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
import Footer from "../Footer/Footer";

function ProductPage() {
    
    // Breadcrumbs
    const location = useLocation();

    const product_id = location.pathname.split("/")[2];    
    
    // response results
    const [info_response, setInfoResponse] = useState("No items found");
    const [imgs_response, setImgsResponse] = useState([]);
    const [specs_response, setSpecs] = useState("Specs were not found");


    // HTTP requests
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

    useEffect(() => {

        const url =`http://localhost:3001/product-specs/${product_id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setSpecs(data);
            })
            .catch(error => console.error('Error:', error))

    }, []);

    // Constructing a product name
    const product_name = info_response.brand + " " + info_response.model;

    const specs_arr = [
        [
            "Display",
            [
                ["Size", `${specs_response.display_size}"`],
                ["Type", specs_response.display_type],
                ["Refresh rate", `${specs_response.display_refresh}Hz`]
            ]
        ],
        [
            "Processor",
            [
                ["Chipset", spe.cpu_namecs_response],
                ["Architecture", `${specs_response.cpu_technology}nm`]
            ]
        ],
        [
            "Operating system",
            [
                ["OS version", specs_response.os_version]
            ]
        ],
        [
            "Memory",
            [
                ["RAM", `${specs_response.memory_ram}GB`],
                ["Storage", `${specs_response.memory_storage}GB`]
            ]
        ],
        [
            "Battery",
            [
                ["Capacity", `${specs_response.battery_capacity}mAh`],
                ["Charging speed", `${specs_response.battery_speed}W`],
                ["Wireless charging", ((specs_response.battery_wireless !== 0) ? `${specs_response.battery_wireless}W` : "No")]
            ]
        ],
        [
            "Connectivity",
            [
                ["5G", ((specs_response.conn_cell > 0) ? "Yes" : "No")],
                ["WI-FI", ((specs_response.conn_wifi > 0) ? "Yes" : "No")],
                ["Bluetooth", specs_response.conn_bluetooth],
                ["NFC", ((specs_response.conn_nfc !== 0) ? "Yes" : "No")]
            ]
        ]
    ]

    function specsContructor(array) {

        return array.map((section, index)=> {

            return (
                <div className="product-specs-info-box" key={index}>
                    <h3>{section[0]}</h3>
                    <table className="product-specs-info-table">
                        <tbody>
                            {
                                section[1].map((row, index) => {
                                    return (
                                        <tr className="product-table-row">
                                            <th className="product-table-title">{row[0]}</th>
                                            <td className="product-table-cell">{row[1]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )

        });

    }

    // console.log(specs_object);
    

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
                                {
                                    specsContructor(specs_arr)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* {(imgs_response.length !== 0) ? <Gallery images={imgs_response}/> : null} */}
            </div>
            <Footer />
        </div>
        
    )    

}

export default ProductPage;