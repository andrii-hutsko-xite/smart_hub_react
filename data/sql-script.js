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

const sql = "SELECT id FROM items"

let processed_result = [];

function generateRandomIds(amount) {

    if (!amount) {
        amount = 1;
    }

    let generatedIds = [];

    const symbols = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]

    function getRandomSymbol(array) {

        const random_value = Math.random();

        return Math.floor(random_value * array.length);

    }

    for (let i = 0; i < amount; i++) {

        const a = symbols[getRandomSymbol(symbols)];
        const b = symbols[getRandomSymbol(symbols)];
        const c = symbols[getRandomSymbol(symbols)];
        const d = symbols[getRandomSymbol(symbols)];

        const symbol = a + b + c + d;

        let taken = false;

        for (let i = 0; i < generatedIds.length; i++) {
            if (generatedIds[i] === symbol) {
                taken = true;
            }
        }

        if (!taken) {
            generatedIds.push(symbol);
        }

    }

    return generatedIds;

}

db.all(sql, (err, result) => {
    if (err) {
        console.log(err.message);
    } else {
        processed_result = result.map((element) => {
            return element.id
        })

        const id_count = processed_result.length;

        const generated_ids = generateRandomIds(id_count);

        const new_ids = processed_result.map((element, index) => {
            
            const sql_query = `UPDATE items SET id = '${generated_ids[index]}' WHERE id = '${element}'`;

            return sql_query;

        })

        new_ids.forEach((element) => {

            db.run(element, [], (err) => {
                if (err) {
                    console.log(err.message);
                    
                }
            })

        })
        
        
    }
})