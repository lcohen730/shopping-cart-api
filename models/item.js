const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    quantity: { type: Number }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item