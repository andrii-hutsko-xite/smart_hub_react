import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductPage() {
    
    const location = useLocation();

    const product_id = location.pathname.split("/")[3];

    // console.log(product_id);

    const [response, setResponse] = useState("No items found");
    

    useEffect(() => {
        const url = `http://localhost:3001/products/${product_id}`;

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
                {response.brand + " " + response.model}
            </div>
        </div>
        
    )    

}

export default ProductPage;