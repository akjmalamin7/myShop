const express = require('express')
const app = express();
const errorMiddleWare = require('./middlewares/errors')
const products = require('./routes/product')
app.use(express.json())

app.use('/api/v1', products)
app.use(errorMiddleWare)



// middle ware to handle errors
module.exports = app;