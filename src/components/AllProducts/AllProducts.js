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
    // The AllProducts component should manage a list of all available filtering items...
    // ... and the list showing which filters are applied
    // I already have a mechanism which figures out which brands are available for filtering – backend is sending

    // for filtering, we nned to distribute items between pages on front-end, rather than receiving already served portions from back-end, but it's not sufficient for large amounts of products
    // let's change our backend so that it understands the difference between totally available items and items it needs to include into response
    // also, it would be great to tell the backend how many items per page we want 

    const [filteringData, setFilteringData] = useState({

        // storage contains a list of all filters in the format:
        // brand: {
        //     Samsung: false,
        //     Google: false
        // }
        storage: {},
        // create – creates a new category with a new key inside and it's default value is false
        create: function(category, key) {
            setFilteringData((prevData) => ({
                ...prevData,
                storage: {
                    ...prevData.storage,
                    [category]: {
                        ...(prevData.storage[category] || {}), // Ensure category exists or initialize as empty
                        [key]: false
                    }
                }
            }));
        },
        set: function(category, key, value) {
            // first we need to check if such a category and a key exist
            // once the necessary category and the key are detected, a setting function is being called
            // calling this function should initiate fetching data from backend and some components re-render
            // thre should be a difference between alavailable items and filtered items in terms what is being shown to users
            if (category in this.storage) {
                if (key in this.storage[category]) {
                    setFilteringData((prevData) => ({
                    ...prevData,
                    storage: {
                        ...prevData.storage,
                        [category]: {
                            ...prevData.storage[category],
                            [key]: value
                        }
                    }
                }));
                } else {
                    console.error(`Filter key "${key}" doesn't exist in category "${category}".`);
                }
            } else {
                console.error(`Filter category "${category}" doesn't exist`)
            }

        }

    });

    // console.log(response);
    

    // console.log(filteringData.storage);
    

    useEffect(() => {
        // frontend sends a complex request with multiple parameters, backend returns a set of items for a specific page, sorting, and filters
        // we need to pack the frontend request efficiently
        // while page and sorting will exist in url all the time, filters will not necessarily be there
        // "&brand=Samsung+Apple+Google"
        // now my filter params shoud be defined by searching for true values in filteringData.storage
        const filterParamsURL = () => {
            let filterParams = "";
            for (const category in filteringData.storage) {
                for (const key in filteringData.storage[category]) {
                    if (filteringData.storage[category][key]) {
                        filterParams += `&${category}=${key}`;
                    }
                }
            }
            return filterParams;
        } 

        const url = `http://localhost:3001/products?page=${current_page}&sorting=${sortingBy}`+filterParamsURL();

        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(data => {                
                setResponse(data.items);
                setTotal(data.total);

                // Batch initial brand filter creation to avoid multiple fetches
                // if filteringData.storage is a dependency of this useEffect.
                setFilteringData(prevFilteringData => {
                    const newBrandStates = {};
                    let hasNewBrands = false;
                    if (data.filtering && data.filtering.brands) {
                        data.filtering.brands.forEach(brandName => {
                            // Only add if not already present in the 'brand' category
                            if (!prevFilteringData.storage.brand || typeof prevFilteringData.storage.brand[brandName] === 'undefined') {
                                newBrandStates[brandName] = false; // Default to not checked
                                hasNewBrands = true;
                            }
                        });
                    }

                    if (hasNewBrands) {
                        return {
                            ...prevFilteringData,
                            storage: {
                                ...prevFilteringData.storage,
                                brand: {
                                    ...(prevFilteringData.storage.brand || {}), // Preserve existing brands
                                    ...newBrandStates // Add new brands
                                }
                            }
                        };
                    }
                    return prevFilteringData; // No change to filteringData if no new brands
                });
            })
            .catch(error => console.error('Error:', error));

    }, [current_page, sortingBy, filteringData.storage]); // Added filteringData.storage
    // it's not right to trigger re-rendering every time useEffect is called because useEffect contributes to changes in filteringDataitself
    // function set should trigger re-rendering exclusively

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
                                {filteringData.storage.brand && Object.entries(filteringData.storage.brand).map(([brandName, isCheckedValue]) => {
                                        return (
                                            <Checkbox
                                                label={brandName}
                                                key={brandName} // Unique key for each checkbox
                                                isChecked={isCheckedValue} // Pass the boolean value here
                                                // This function will be called by the Checkbox component when it's clicked
                                                onChange={() => filteringData.set("brand", brandName, !isCheckedValue)}
                                            />
                                        );
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