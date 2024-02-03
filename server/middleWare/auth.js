const ErrorHandler = require("../utils/errorhandler");
const asyncError = require("./asyncError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = asyncError(async (req, res, next) =>{
    const {token} = req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHandler("Please login first", 401));
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(data.id);

    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} can not access this`, 403))
        }

        next()
    }
    
}