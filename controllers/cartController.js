const User = require('../models/user');
const Item = require('../models/item');
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');
const { showItem } = require('./itemController');

exports.listCartItems = async (req, res) => {
    try {
        // req.body.user = req.user._id
        // console.log(req.user.cart)
        // const foundItems = await Item.find({});
        // const foundCart = await Cart.findOne({_id: req.params.id})
        if (req.user.cart) {
            const cartItems = req.user.cart.items
            // console.log(cartItems)
            let subTotal = 0
            // foundCart.items.forEach(item => subTotal += item.price)
            cartItems.forEach(item => subTotal += (item.price * item.quantity))
            // res.render('items/Index', {
            // res.render('items', {    
            //     items: foundItems
            // })
            res.json({ cartItems, subTotal })
            // console.log({ cartItems, subTotal })
            // res.json(req.user.cart)
        }
        else {
            res.json('Your cart is empty. Feed it, it\'s hungry.')
        }
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
        req.body.user = req.user._id
        const updates = Object.keys(req.body)
        // const item = await Item.findOne({ _id: req.params.id })
        const item = await req.user.cart.items.find(item => item._id == req.params.id)
        updates.forEach(update => {
            if (update = 'quantity') {
                item[update] = req.body[update]
                // req.user.cart.items[update] = req.body[update]
            }
            // console.log(req.user.cart.item[update])
            // console.log(update)
            // console.log(item[update])
            // console.log(req.body[update])
            /* else {
                res.status(400).json('Bad request. Only quantity can be changed for an item in cart.')
            } */
        })
        // await req.user.save()
        await req.user.cart.save()
        res.json(req.user.cart.items)
    }
    /* req.body.user = req.user._id
        const foundItem = await Item.findOne({_id: req.params.id})
        if (req.user.cart) {
            // console.log(req.user)
            // req.user.cart.items.addToSet({ _id: foundItem._id })
            req.user.cart.items.addToSet({ 
                _id: foundItem._id,
                name: foundItem.name,
                price: foundItem.price,
                type: foundItem.type,
                quantity: 1
            })
            // req.user.cart.items.addToSet({ _id: foundItem._id, name: foundItem.name })
        } */
    catch (error) {
        res.status(400).json('Bad request. Only quantity can be changed for an item in cart.')
    }
}

exports.deleteItem = async (req, res) => {
    try {
        /* await Item.findOneAndDelete({'_id': req.params.id})
            .then(() => {
                res.redirect('/items')
            }) */
        req.body.user = req.user._id
        const cartItems = req.user.cart.items
        const item = await cartItems.find(item => item._id == req.params.id)
        const index = cartItems.indexOf(item)
        cartItems.splice(index, 1)
        await req.user.cart.save()
        res.json(req.user.cart.items)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}