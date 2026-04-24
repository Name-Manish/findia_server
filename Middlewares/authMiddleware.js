const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token" });
    }

    try {
        const verification = jwt.verify(token, process.env.secrete_key);

        req.user = verification; // attach user to request
        next(); // pass control

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};