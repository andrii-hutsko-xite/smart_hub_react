// const express = require('express');
// const app = express();
const sqlite3 = require('sqlite3').verbose();

// this file need to export a reusable object with methods

function issueRefreshToken(userId) {

    const connectToDatabase = new Promise((resolve, reject) => {

        // Connect to the database
        const db = new sqlite3.Database('./main.db', (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
                reject(err.message);
            } else {
                resolve(db);
            }
        });

    });

    connectToDatabase.then(db => {

        console.log('1. refreshToken connected to the main.db SQLite database.');

        const checkUserId = new Promise((resolve, reject) => {
            
            // Check if uiseId is valid
            const query = 'SELECT * FROM users WHERE id = ?';
            db.get(query, [userId], (err, row) => {
                if (err) {
                    console.error('Error executing query:', err.message);
                    reject(err.message);
                } else {
                    resolve(db)
                }
            });

        });

        checkUserId.then(db => {

            console.log('user id is valid, preparing for generating token');

            // generate randomized symbol
            function getRandomSymbol() {
                const symbols = [
                    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
                ];
                const randMathValue = Math.random();
                const randSymbolIndex = Math.floor(randMathValue * symbols.length);
                return symbols[randSymbolIndex];
            }

            // just a function to collect UUID from randomized symbols
            function generateRefreshToken() {
                return (
                    getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol() +
                    "-" +
                    getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol() +
                    "-" +
                    getRandomSymbol() + getRandomSymbol() + getRandomSymbol() + getRandomSymbol()
                )
            };

            // create a token in db
            const query = 'INSERT INTO tokens (user_id, token, expires_at) VALUES (?, ?, ?)';
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);
            const expirationDateISORaw = expirationDate.toISOString();
            const bareDateTime = expirationDateISORaw.substring(0, 16);
            const expirationDateISOClean = `${bareDateTime}:00.000Z`;
            const geenratedToken = generateRefreshToken();
            console.log(geenratedToken);

            db.run(query, [userId, geenratedToken, expirationDateISOClean], err => {
                if (err) {
                    console.error('Error executing query:', err.message);
                }
            });
                

        }).catch(err => {
            console.log(err);
        });

    }).catch();

}

function revokeRefreshToken(userId, token) {

    const connectToDatabase = new Promise((resolve, reject) => {

        // Connect to the database
        const db = new sqlite3.Database('./main.db', (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
                reject(err.message);
            } else {
                resolve(db);
            }
        });

    });

    connectToDatabase.then(db => {

        // Check if token exists and it matches user
        const query = 'DELETE FROM tokens WHERE user_id = ? AND token = ?';

        db.run(query, [userId, token], (err) => {
            if (err) {
                console.error('Error executing query:', err.message);
            }
        });

    });

}

module.exports = {
    issueRefreshToken,
    revokeRefreshToken
}