const jwt = require('jsonwebtoken')
const User = require('../models/users.models')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    let token;
    const bearerRegex = /^Bearer [A-Za-z0-9\-._~+/]+=*$/;

    if (req.headers.authorization && bearerRegex.test(req.headers.authorization)) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
            req.user = await User.findById(decoded.id).select("-password");
            next()
        } catch (error) {
            res.status(401);
            console.log(error.message)

        }
    }
    if (!token) {
        res.status(401);
        console.log(error.message)
    }
});

module.exports = { protect };