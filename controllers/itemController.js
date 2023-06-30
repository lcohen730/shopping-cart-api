const User = require('../models/user');
const Item = require('../models/item');
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');

exports.listItems = async (req, res) => {
    try {
        const foundItems = await Item.find({});
        // res.render('items/Index', {
        // res.render('items', {    
        //     items: foundItems
        // })
        res.json(foundItems)
    }
    catch (error) {
        // res.status(400).send({ message: error.message })
        res.status(400).json({ message: error.message })
    }
}

// idea for listing all items within a given category
/* exports.listItems = async (req, res) => {
    try {
        const foundItems = await Item.find({ type: req.params.type });
        // res.render('items/Index', {
        // res.render('items', {    
        //     items: foundItems
        // })
        res.json(foundItems)
    }
    catch (error) {
        // res.status(400).send({ message: error.message })
        res.status(400).json({ message: error.message })
    }
} */

// list cart items? if cart controller is not needed...
// list cellos
// list violas
// list basses
// list violins
// list bows
// list rosins
// list cases
// list others

/* exports.newItem = (req, res) => {
    res.render('items/New')
} */

exports.createItem = async (req, res) => {
    try {
        // req.body.user = req.user._id
        /* const item = new Item(req.body);
        await item.save() */ // this section is only needed for users because you are waiting for password to be hashed
        const item = await Item.create(req.body)
        res.json(item)
    }
    catch (error) {
        res.status(400).json({})
    }
}

exports.showItem = async (req, res) => {
    try {
        const foundItem = await Item.findOne({_id: req.params.id})
        // res.render('items/Show', {
        // res.render('items', {
        //     item: foundItem
        // })
        res.json(foundItem)
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

exports.addToCart = async (req, res) => {
    try {
        req.body.user = req.user._id
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
        }
        else {
            // console.log('cart doesnt exist')
            req.user.cart = await Cart.create({
                // items: [{_id: foundItem._id }],
                items: [{
                    _id: foundItem._id,
                    name: foundItem.name,
                    price: foundItem.price,
                    type: foundItem.type,
                    quantity: 1
                }],
                // items: [{ _id: foundItem._id, name: foundItem.name }],
                user: req.body.user
            })
        }
        await req.user.save()
        await req.user.cart.save()
            /* .then(() => {
                res.redirect('/cart/req.user.cart.id')
            }) */
        console.log(req.user.cart.items)
        res.json(req.user.cart.items)
    }
    catch (error) {
        // res.status(400).send({ message: error.message })
        res.status(400).json({ message: error.message })
    }
}