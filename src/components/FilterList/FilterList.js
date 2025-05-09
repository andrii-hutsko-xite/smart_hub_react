import { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './FilterList.css';

function FilterList(itemsToFilter: string[]) {

    // Filters is a set of instructions which are used by backend while serving items to frontend;
    // I need to store applied filters somewhere before they can be sent to backend;
    // The moment of sending filtering instructions is the moment of user pressing "Apply filters" button;
    // But modern interfaces don't usually have an explicit button and filtering action is rather intiated by...
    // ... by just updating the list of filters
    // This requires an algorithm which would handle changes in a list of filters and backend request queue
    // If too many requests are made within a limited time range, latter requests should be dismissed
    // This requires async JS
    // Let's get back to the list of filters – the list should be accessible by every filter component
    // That's why I will use a state in AllProducts compponent/page and I will interact with children
    // The problem is that any time the state is updated, the whole component rerenders (AllProducts in this case)
    // Maybe it's okay for now

    return (
        <div className='filter-list-container'>
            <h2>Brands</h2>
            <div className='filters-list-items'>
                {
                    itemsToFilter?.map((element, index) => {
                        return (
                            <Checkbox label={element} key={element} checkedAction={setFilteredItems} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FilterList;