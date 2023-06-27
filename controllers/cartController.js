const User = require('../models/user');
const Item = require('../models/item');
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');
const { showItem } = require('./itemController');

exports.listCartItems = async (req, res) => {
    try {
        // req.body.user = req.user._id
        /* console.log(req.user.cart)
        // const foundItems = await Item.find({});
        // const foundCart = await Cart.findOne({_id: req.params.id})
        const cartItems = req.user.cart.items
        console.log(cartItems)
        let subTotal = 0
        // foundCart.items.forEach(item => subTotal += item.price)
        cartItems.forEach(item => subTotal += item.price) */
        // res.render('items/Index', {
        // res.render('items', {    
        //     items: foundItems
        // })
        // res.json({ cartItems, subTotal })
        // console.log(req.user)
        res.json(req.user.cart)
    }
    catch (error) {
        // res.status(400).send({ message: error.message })
        res.status(400).json({ message: error.message })
    }
}

/* exports.editItem = async (req, res) => {
    try {
        const foundItem = await Item.findOne({_id: req.params.id})
        // res.render('items/Edit', {
        // res.render('items', {
        //     item: foundItem
        // })
        res.json(foundItem)
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }
} */

exports.updateItem = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const item = await Item.findOne({ _id: req.params.id })
        updates.forEach(update => item[update] = req.body[update])
        await item.save()
        res.json(item)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        await Item.findOneAndDelete({'_id': req.params.id})
            .then(() => {
                res.redirect('/items')
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}