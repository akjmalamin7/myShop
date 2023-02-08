const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleWare = require('./middlewares/errors')
const products = require('./routes/product')
const auth = require('./routes/auth')

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', products)
app.use('/api/v1', auth)

app.use(errorMiddleWare)



// middle ware to handle errors
module.exports = app;