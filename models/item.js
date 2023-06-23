const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    type: String,
    quantity: { type: Number, default: 1 }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item