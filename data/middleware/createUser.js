const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./main.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('createUser connected to the main.db SQLite database.');
    }
});

function createUser(email, password) {

    function generateUUID() {

        function getRandomSymbol() {

            const symbols = [
                "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
            ]

            const randMathValue = Math.random();

            const randSymbolIndex = Math.floor(randMathValue * symbols.length);

            return symbols[randSymbolIndex];

        }

        return (getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol());

    }

    function checkIfTaken(potentialId) {

        const query = 'SELECT * FROM users WHERE id = ?';
        
        db.get(query, [potentialId], (err, row) => {

            if (err === null && row === undefined) { // if err === null and/or row === undefined, then ther's no error – this is just db found no matches
                return false;
            } else {
                return true;
            }

        });

    }

    let uuid;

    do {
        uuid = generateUUID();
    } while (checkIfTaken(uuid) === true);

    if (uuid !== undefined) {

        const query = 'INSERT INTO users (id, email, password) VALUES (?,?,?)';

        db.run(query, [uuid, email, password], err => {

            if (err) {
                return console.error(err.message)
            } else {
                console.log("Uses has been created!");
            }

            db.close();

        });

    }

}

module.exports = createUser;