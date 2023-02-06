const {Product} = require('../models/product')

//create new product

exports.newProduct = async (req, res, next) =>{
    const product = await Product.create(req.body);
    res.status(200).json({
        success:true,
        product
    })
}

//get product
exports.getProducts = async (req,res,next)=>{
    const products = await Product.find()
    res.status(200).json({
        success:true,
       count:products.length,
       products
    });
}