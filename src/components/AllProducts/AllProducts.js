import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import ItemCard from '../ItemCard/ItemCard';
import "./AllProducts.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
    const location = useLocation();


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
        set: function(category, key, value) {

            // PARAMETERS:
            // catergory – filtering category in filteringData.storage, e.g. "brand", "price", "rating", etc.
            // key – category key, e.g. category "brand" can have following keys: "Samsung", "Apple", "Google", etc.
            // value – key value, any given key might have the value of either true or false, which defines whether the filter is active or not

            // STORAGE STRUCTURE:
            // storage: {
            //     brand: {
            //         Samsung: false,
            //         Apple: false,
            //         Google: false
            //     }

            // 1. DETECTING DIFFERENCES
            // The function checks if the arguments seem to make changes to the filteringData.storage
            // What can be changed: if category and key match, only value can be changed;
            // If category or/and key is uknown, then we create new category or/and key with a default value of false

            let changedCategory = false; // if true, setup a new category with provided key and default value of false
            let changedKey = false; // if true, setup a new key in the defined category with a default value of false
            let changedValue = false; // if true, assign suggested value to the existing key

            if (typeof category !== null && typeof category !== 'undefined') {
                if (this.storage.hasOwnProperty(category)) {
                    if (typeof key !== null && typeof key !== 'undefined') {
                        if (this.storage[category].hasOwnProperty(key)) {
                            if (typeof value !== null && typeof value !== 'undefined') {
                                if (this.storage[category][key] !== value) {
                                    changedValue = true;
                                }
                            }
                            // value is not a reuired parameter
                        } else {
                            changedKey = true;
                        }
                    } else {
                        console.error('Key is not valid');
                    }
                } else {
                    changedCategory = true;
                }
            } else {
                console.error('Category is either null or undefined');
            }

            // console.log(`Category changed: ${changedCategory}; Key changed: ${changedKey}; Value changed: ${changedValue}`);

            setFilteringData(prevData => {
                if (changedCategory) {
                    return {
                        ...prevData,
                        storage: {
                            ...prevData.storage,
                            [category]: {
                                [key]: value
                            }
                        }
                    }
                } else if (changedKey) {
                    return {
                        ...prevData,
                        storage: {
                            ...prevData.storage,
                            [category]: {
                                ...prevData.storage[category],
                                [key]: false
                            }
                        }
                    }
                } else if (changedValue) {
                    return {
                        ...prevData,
                        storage: {
                            ...prevData.storage,
                            [category]: {
                                ...prevData.storage[category],
                                [key]: value
                            }
                        }
                    }
                } else {
                    return prevData;
                }
            });

        }

    });

    // filteringData.set("brand", "Samsung", false);
    // filteringData.create("brand", "LG");
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
            // console.log(filterParams);
            return filterParams;
        }

        const url = `http://localhost:3001/products?page=${current_page}&sorting=${sortingBy}`+filterParamsURL();

        // console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(data => {                
                setResponse(data.items);
                setTotal(data.total);

                // Batch initial brand filter creation to avoid multiple fetches
                // if filteringData.storage is a dependency of this useEffect.

                data.filtering.brands.forEach(brandName => {
                    // filteringData.create("brand", brandName);
                    filteringData.set("brand", brandName);
                });

                if (location.search) {
                    // ?brand=Google
                    const params = new URLSearchParams(location.search);
                    filteringData.set("brand", params.get("brand"), true);
                }

                console.log(filteringData.storage);
                
                
                // setFilteringData(prevFilteringData => {
                //     const newBrandStates = {};
                //     let hasNewBrands = false;
                //     if (data.filtering && data.filtering.brands) {
                //         data.filtering.brands.forEach(brandName => {
                //             // Only add if not already present in the 'brand' category
                //             if (!prevFilteringData.storage.brand || typeof prevFilteringData.storage.brand[brandName] === 'undefined') {
                //                 newBrandStates[brandName] = false; // Default to not checked
                //                 hasNewBrands = true;
                //             }
                //         });
                //     }

                //     if (hasNewBrands) {
                //         return {
                //             ...prevFilteringData,
                //             storage: {
                //                 ...prevFilteringData.storage,
                //                 brand: {
                //                     ...(prevFilteringData.storage.brand || {}), // Preserve existing brands
                //                     ...newBrandStates // Add new brands
                //                 }
                //             }
                //         };
                //     }
                //     return prevFilteringData; // No change to filteringData if no new brands
                // });
            })
            .catch(error => console.error('Error:', error));

    }, [current_page, sortingBy, filteringData.storage, location]); // Added filteringData.storage
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