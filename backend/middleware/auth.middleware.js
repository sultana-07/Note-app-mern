const jwt = require('jsonwebtoken');
const userModel = require('../models/user.models');


module.exports.authUser = async (req, res, next) => {
    let token;
    
    // Check authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } 
    // Check cookies
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ error: "No token provided. Authentication required." });
    }
    console.log("this is the token", token);
    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json("invalid token");
    }
}