const dotenv = require('dotenv')
const connectDatabase = require('../config/database')

const products = require('../data/products')
const {connect} = require('mongoose')
const { Product } = require('../models/product')


// Setting dotenv file
dotenv.config({path: 'backend/config/config.env'})
connectDatabase();

const seedProducts = async () =>{
    try{
        await Product.deleteMany()
        console.log('Products are deleted')

        await Product.insertMany(products)
        console.log('AProducts are deleted')
        process.exit();
    }catch(error){
        console.log(error.message);
        process.exit();
    }
}
// seedProducts()