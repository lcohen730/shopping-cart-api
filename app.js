const express = require('express');
const jsxEngine = require('jsx-view-engine');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/items', itemRoutes)
app.use('/cart', cartRoutes)
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

module.exports = app