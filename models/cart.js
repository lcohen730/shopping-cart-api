const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [{ objectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            name: { type: mongoose.Schema.Types.String, ref: 'Item' },
            price: { type: mongoose.Schema.Types.Number, ref: 'Item' },
            type: { type: mongoose.Schema.Types.String, ref: 'Item' },
            quantity: { type: mongoose.Schema.Types.Number, ref: 'Item' }
    }],
    subTotal: Number,
    // quantity: { type: Number, default: 1 },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart