const ErrorHandler = require("../utils/errorhandler")
const asyncError = require("../middleWare/asyncError")
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEMail = require("../utils/sendEMail")
const crypto = require("crypto")
const cloudinary = require("cloudinary");
//Registration

exports.registerUser = asyncError(async(req, res, next) => {
    try {
        if(req.body.avatar === ""){
            return next(new ErrorHandler("Add a photo", 401));
        }
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            width: 150,
            crop: "scale",
        });
    
        const {name, email, password, mobile} = req.body;
    
        const user = await User.create({
            name, email, password, mobile,
            avatar:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        })
    
        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 501));
    }
    
});

// LOGIN


exports.login = asyncError(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email  ||  !password){
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Please Enter valid Email And Password", 401));
    }

    const isPasswordMatch = await user.comparePasswords(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Please Enter valid Email And Password", 401));
    }

    sendToken(user, 200, res);
})

//LOG OUT

exports.logout = asyncError( async (req, res, next) =>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})


//Forgot Password

exports.forgotPassword = asyncError( async(req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next( new ErrorHandler("No user found", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `reset password token os : \n\n ${resetPasswordURL} \n\n ignore if you haven't not requested`;

    try {
        await sendEMail({
            email: user.email,
            subject: `Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully `
        })
    } catch (error) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500))
    }
})


//RESET PASSWORD

exports.resetPassword = asyncError( async(req, res, next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt: Date.now()},
    })

    if(!user){
        return next( new ErrorHandler("Invalid or Expired Token", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't Match", 404))
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({validateBeforeSave: false});

    sendToken(user, 200, res)
})


// User Details

exports.getUserDetails = asyncError( async(req, res, next) => {
    const user = await User.findById(req.user.id);
    

    res.status(200).json({
        success: true,
        user
    })
})


//Password Change

exports.changePassword = asyncError( async(req, res, next) => {
    
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePasswords(req.body.oldPassword);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Please Enter valid Email And Password", 401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't Match", 404))
    }

    user.password = req.body.newPassword;
    await user.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        user
    })
})

// Update Profile

exports.updateProfile = asyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
    };
  
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId)
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });


// get All user details --ADMIN
exports.getAllUsers = asyncError( async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//get 1 user info (id) --ADMIN
exports.getSingleUserInfo = asyncError( async(req, res, next) =>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next( new ErrorHandler("No such user", 400));
    }

    res.status(200).json({
        success: true,
        user
    })

})

//Update Role --ADMIN
exports.updateUserRole = asyncError( async(req, res, next) => {
    const newData = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role
    }

    await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        
    })
})

//Delete User --ADMIN
exports.deleteUser = asyncError( async(req, res, next) =>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next( new ErrorHandler("No such user", 400));
    }

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })

})