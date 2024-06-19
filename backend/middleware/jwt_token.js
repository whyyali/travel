const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
            if (error) {
                return res.status(403).json({ status: false, message: "Invalid token" })
            }

            req.user = user;
            next()
        })

    }
    else {
        return res.status(401).json({ status: false, message: "you are not authenticated" })
    }
}

module.exports = { verifyToken }