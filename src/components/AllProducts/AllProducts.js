import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import ItemCard from '../ItemCard/ItemCard';
import "./AllProducts.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaginationBox from '../PaginationBox/PaginationBox';
import Footer from '../Footer/Footer';
import Dropdown from '../Dropdown/Dropdown';
import Checkbox from '../Checkbox/Checkbox';

function AllProducts() {

    // Setting states
    const [response, setResponse] = useState([]);
    const [total_items, setTotal] = useState(0);
    const [current_page, setPage] = useState(1);
    const [sortingBy, setSorting] = useState("popularity");

    // Settings filtering states
    const [availableBrands, setAvailableBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);

    useEffect(() => {
        const url = `http://localhost:3001/products?page=${current_page}&sorting=${sortingBy}&brands=${filteredBrands}`;        

        fetch(url)
            .then(response => response.json())
            .then(data => {                
                setResponse(data.items);
                setTotal(data.total);
                setAvailableBrands(data.filtering.brands);
                
            })
            .catch(error => console.error('Error:', error));

    }, [current_page, sortingBy, filteredBrands]);

    return (

        <div className="App">
            <Header />
            <div className="main-content">
                <Breadcrumbs />
                <div className="secondary-content">
                    <div className='filters-container'>
                        <div className='filters-box'>
                            <h2>Brands</h2>
                            <div className='filters-list'>
                                {
                                    availableBrands?.map((element, index) => {
                                        return (
                                            <Checkbox label={element} key={element} checkedAction={setFilteredBrands} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='products-container-plug'>
                        <div className='products-modifiers'>
                            <Dropdown setSorting={setSorting} />
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