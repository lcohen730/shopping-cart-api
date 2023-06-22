const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/users', userRoutes)

module.exports = app