const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynchronous = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')


// Register a user
exports.registerUser = catchAsynchronous(async(req, res, next)=>{
    const {name, email, password} = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'avatar/avatar',
            url:'https://www.soppiya.com/media/images/6304a9b78da5dfa6ec049a54/item/6305c2ce6aa739c3c1801941/image1.webp'
        }
    })
    

    sendToken(user, 200, res)
    // const token = user.getJwtToken()

    // res.status(201).json({
    //     success:true,
    //     token
    // })
})

//login user
exports.loginUser = catchAsynchronous(async(req, res, next)=>{
    const {email,password} = req.body;

    // Checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // finding user is database
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }
    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)
    // const token = user.getJwtToken()
    // console.log(token);
    // res.status(200).json({
    //     success:true,
    //     token
    // })
})


// forgot password
exports.forgotPassword = catchAsynchronous(async(req, res, next)=>{

    const user = await User.findOne({email:req.body.email})
    
    if(!user){
        return next(new ErrorHandler('User not found with this email', 404))
    }

    // get reset token

    const resetToken = user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})

    //create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nif you have not requested this email, then ignore it.`

    try{
        await sendEmail({
            email:user.email,
            subject: 'myShop Password Recovery',
            message
        })

        res.status(200).json({
            success:true,
            message:`Email send to: ${user.email}`
        })

    }catch(error){
        user.getResetPasswordToken = undefined
        user.getResetPasswordExpire = undefined

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message, 500))
    }
})

// reset password
exports.resetPassword = catchAsynchronous(async(req, res, next)=>{

    // hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })


    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    }

    //setup new password
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    sendToken(user, 200, res)
})



// logout user

exports.logout = catchAsynchronous(async(req,res,next)=>{
    res.cookie('token', null, {
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:'Logged out'
    })
})