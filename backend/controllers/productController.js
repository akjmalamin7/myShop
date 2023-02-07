const { Product } = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynchronous = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
//create new product

exports.newProduct = catchAsynchronous(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
})

//get product
exports.getProducts = catchAsynchronous(async (req, res, next) => {
    const resPerPage = 4
    const productCount = await Product.countDocuments()
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    });
})

// get single product

exports.getSingleProduct = catchAsynchronous(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    try {
        if (!product) {
            throw new Error('Not found!')
        }
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        next(error)
    }

})


// update product

exports.updateProduct = catchAsynchronous(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

// delete product

exports.deleteProduct = catchAsynchronous(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    await product.remove()
    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})