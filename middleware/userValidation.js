const jwt = require("jsonwebtoken");
require('dotenv').config();
const user = require("../model/users");

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ error: "Unauthorized User" });

    if (authorization.includes("Bearer ")) {
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, process.env.KEY, async (err, payload) => {
            if (err) 
                return res.status(401).json({ error: "Unauthorized User" });
            
            const email  =  payload.email;
            const userDBResult = await user.findOne({ email }).lean();
            if (!userDBResult)
                return res.status(401).json({ error: "Unauthorized User" });
            req.user = userDBResult;
            next();
        });
    }

};