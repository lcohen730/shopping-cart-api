const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    subTotal: Number,
    quantity: { type: Number, default: 1 },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart