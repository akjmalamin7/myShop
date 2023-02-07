const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsynchronous = require('../middlewares/catchAsyncErrors')

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
    console.log(user);
    res.status(201).json({
        success:true,
        user
    })
})