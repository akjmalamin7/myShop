const mongoose = require('mongoose')

const connectDatabase = () =>{
    mongoose.connect('mongodb://127.0.0.1:27017/myshop')
    .then(()=> console.log("MongoDB Connected"))
    .catch((err)=> console.error("MongoDB connection failed"))
}

module.exports = connectDatabase;