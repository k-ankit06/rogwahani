const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const decoded = jwt.verify(token, secret);
        req.id = decoded.id;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        res.status(401).json({ msg: "Token is not valid" });
    }
};
