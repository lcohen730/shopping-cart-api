const User = require('../models/user');
const Item = require('../models/item');
// const Cart = require('../models/Cart');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id: data._id });
        if (!user) {
            throw new Error()
        }
        req.user = user
        next();
    }
    catch (error) {
        res.status(401).send('User not authorized for this action.')
    }
}

exports.listCartItems = async (req, res) => {
    try {
        const foundItems = await Item.find({});
        let subTotal = 0
        foundItems.forEach(item => subTotal += item.price)
        // res.render('items/Index', {
        // res.render('items', {    
        //     items: foundItems
        // })
        res.json({ foundItems, subTotal })
    }
    catch (error) {
        // res.status(400).send({ message: error.message })
        res.status(400).json({ message: error.message })
    }
}

/* exports.newItem = (req, res) => {
    res.render('items/New')
} */

exports.createItem = async (req, res) => {
    try {
        // req.body.user = req.user._id
        /* const item = new Item(req.body);
        await item.save() */ // this section is only needed for users because you are waiting for password to be hashed
        const item = await Item.create(req.body)
        const token = await item.generateAuthToken();
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

exports.editItem = async (req, res) => {
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
}

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