import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import ItemCard from '../ItemCard/ItemCard';
import "./AllProducts.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaginationBox from '../PaginationBox/PaginationBox';
import Footer from '../Footer/Footer';

function AllProducts() {

    const [response, setResponse] = useState([]);

    const [total_items, setTotal] = useState(0);

    const [current_page, setPage] = useState(1);
    

    useEffect(() => {
        const url = `http://localhost:3001/products/${current_page}`;        

        fetch(url)
            .then(response => response.json())
            .then(data => {                
                setResponse(data.items);
                setTotal(data.total);
            })
            .catch(error => console.error('Error:', error));

    }, [current_page]);
    

    return (

        <div className="App">
            <Header />
            <div className="main-content">
                <Breadcrumbs />
                <div className="secondary-content">
                    <div className='filters-plug'></div>
                    <div className='products-container-plug'>
                        <div className='products-modifiers'>
                            <div className='sorting-plug'></div>
                            <PaginationBox total={total_items} current_page={current_page} setPage={setPage} />
                        </div>
                        <div className='showcase-plug'>
                            {
                                response.map((element, index) => {
                                    return (
                                        <Link to={`/all-products/${element.id}`} key={index}>
                                            <ItemCard itemObject={element} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className='products-modifiers'>
                            <div className='sorting-plug'></div>
                            <PaginationBox total={total_items} current_page={current_page} setPage={setPage} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )


}

export default AllProducts;