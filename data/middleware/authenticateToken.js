const jwt = require('jsonwebtoken');
const secretKey = 'nS8l3m2A09dN76dfS21cDm87SqQnc92'; // Replace with your actual secret key (should be in an environment variable)

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token == null) {
        return res.sendStatus(401); // No token
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.sendStatus(403); // Invalid token
        }

        req.user = user; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;