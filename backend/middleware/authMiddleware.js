const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied"
        });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

    console.log("Token:", token);

    try {

        const decoded = jwt.verify(token, "quickbite_secret_key");

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("Error Name:", error.name);
        console.log("Error Message:", error.message);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;