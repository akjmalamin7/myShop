const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsynchronous = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')


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