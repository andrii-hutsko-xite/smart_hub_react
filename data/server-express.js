// Import Express
const express = require('express');

// Import Sqlite
const sqlite3 = require('sqlite3').verbose();

// Initialize the app
const app = express();

// CORS origins set manually
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    next();
});

// Connect to the database
const db = new sqlite3.Database('./main.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the main.db SQLite database.');
    }
});

// Define a route to get data
app.get('/products?', (req, res) => {

    const sortingRules = {

        "popularity": "sold DESC",
        "price low to high": "price ASC",
        "price high to low": "price DESC",
        "rating": "rating DESC"

    }

    const { page, sorting, brand } = req.query;

    console.log("Received brand query param:", brand); // For debugging

    const items_per_page = 16;
    let total_records;
    let queryParams = [];
    let whereClauses = [];

    // Build WHERE clause for brand filtering
    if (brand) {
        // If 'brand' is a single string, convert to array for consistent handling
        const brandsToFilter = Array.isArray(brand) ? brand : [brand];
        if (brandsToFilter.length > 0) {
            whereClauses.push(`brand IN (${brandsToFilter.map(() => '?').join(',')})`);
            queryParams.push(...brandsToFilter);
        }
    }

    let countQuery = 'SELECT COUNT(*) AS total_records FROM items';
    if (whereClauses.length > 0) {
        countQuery += ` WHERE ${whereClauses.join(' AND ')}`;
    }
    
    //Requesting total number of records to decide what to return
    // Pass queryParams for brand filtering to the count query as well
    db.get(countQuery, queryParams, (err, row) => {
        if (err) {
            console.error(err.message);
            // It's good practice to send an error response if this critical query fails
            // For now, we'll let the main query handle the response
        } else {
            total_records = row.total_records;
        }
    });

    const offset = (page - 1) * items_per_page;
    queryParams.push(offset); // Add offset to the end of queryParams for the main query

    let baseQuery = `SELECT * FROM items`;
    if (whereClauses.length > 0) {
        baseQuery += ` WHERE ${whereClauses.join(' AND ')}`;
    }
    const finalQuery = `${baseQuery} ORDER BY ${sortingRules[sorting]} LIMIT ${items_per_page} OFFSET ?`;

    db.all(finalQuery, queryParams, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error fetching data');
        } else {     
            
            //Getting list of brands
            let brandList;
            db.all('SELECT DISTINCT brand FROM items', (err, brandResult) => {
                if (err) {
                    console.log(err.message);
                } else {
                    const BrandResultOptimized  = brandResult.map((element) => {
                        return element["brand"];
                    });
                    brandList = BrandResultOptimized;
                    
                    const data = {
                        items: rows,
                        total: total_records,
                        filtering: {
                            brands: brandList
                        }
                    }
                    res.json(data);

                }
            })

        }
    });
});

app.get('/product-info/:id', (req, res) => {

    const { id } = req.params;
    
    const query = 'SELECT * FROM items WHERE id = ?';
    
    db.get(query, [id], (err, row) => { // Use db.get for a single result
        if (err) {
            console.error(err.message);
            res.status(500).send('Error fetching data');
        } else if (!row) {
            res.status(404).send('Product not found'); // Handle case where no product is found
        } else {
            res.json(row); // Return the product as JSON
        }
    });

});

app.get('/product-imgs/:id', (req, res) => {

    const { id } = req.params;
    
    const query = 'SELECT img_1, img_2, img_3, img_4 FROM item_images WHERE id = ?';
    
    db.get(query, [id], (err, row) => { // Use db.get for a single result
        if (err) {
            console.error(err.message);
            res.status(500).send('Error fetching data');
        } else if (!row) {
            res.status(404).send('Product not found'); // Handle case where no product is found
        } else {
            res.json(row); // Return the product as JSON
        }
    });

});

app.get('/promos/:name', (req, res) => {
    const { name } = req.params;
    const query = 'SELECT * FROM items WHERE promo = ? LIMIT 5';
    db.all(query, [name], (err, row) => { // Use db.get for a single result
        if (err) {
            console.error(err.message);
            res.status(500).send('Error fetching data');
        } else if (!row) {
            res.status(404).send('Product not found'); // Handle case where no product is found
        } else {
            res.json(row); // Return the product as JSON            
        }
    });
});

app.get('/product-specs/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM items_specifications WHERE id = ?';
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error fetching data');
        } else if (!row) {
            res.status(404).send('Product not found');
        } else {
            res.json(row);
        }
    });

});

// Start the server on port 3000
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});