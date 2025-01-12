// Import Sqlite
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./main.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the main.db SQLite database.');
    }
});

const iphones = [
    "alI8 - google-pixel-9-pro-fold-m",
    "upwr - google-pixel-9-pro-m",
    "aCkT - google-pixel-9-pro-xl-m",
    "3B6s - google-pixel-9-m",
    "ppMy - google-pixel-8-pro-m",
    "uVGD - google-pixel-8-m",
    "YmcH - google-pixel-8a-m",
    "waGW - google-pixel-fold-m"
]



const result = iphones.map((element) => {

    const splitted = element.split(" ");

    const correct_model_name = splitted[2].slice(0, -2);

    const image_names = [
        "/media/products/" + correct_model_name + "-1.jpg",
        "/media/products/" + correct_model_name + "-2.jpg",
        "/media/products/" + correct_model_name + "-3.jpg",
        "/media/products/" + correct_model_name + "-4.jpg",
    ]

    let final = [];

    final.push(splitted[0]);

    image_names.forEach((elem) => {
        final.push(elem);
    })

    const sql = "INSERT INTO item_images (id, img_1, img_2, img_3, img_4) VALUES (?, ?, ?, ?, ?)";

    db.all(sql, final, (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("items added");
            
        }
    })

    return final

})

// console.log(result);
