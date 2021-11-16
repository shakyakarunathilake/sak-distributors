const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.config');

checkAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "NO TOKEN PROVIDED"
        });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "UNAUTHORIZED"
            });
        }

        req.username = decoded.username;
        next();
    });
};

module.exports = checkAuth;