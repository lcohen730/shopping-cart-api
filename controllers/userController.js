const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, 'souvenir');
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

exports.listUsers = async (req, res) => {
    try {
        const foundUsers = await User.find({});
        // res.render('users/Index', {
        res.render('users', {    
            users: foundUsers
        })
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }
}

/* exports.newUser = (req, res) => {
    res.render('users/New')
} */

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        const token = await user.generateAuthToken();
        res.json({ user, token })
    }
    catch (error) {
        res.status(400).json({})
    }
}

exports.loginUser = async (req, res) => {
    // res.render('users/Login')
    res.render('users')
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            res.status(400).send('Invalid login credentials')
        }
        else {
            const token = await user.generateAuthToken();
            res.json({ user, token })
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({_id: req.params.id})
        // res.render('users/Show', {
        res.render('users', {
            user: foundUser
       })
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.editUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({_id: req.params.id})
        // res.render('users/Edit', {
        res.render('users', {
            user: foundUser
        })
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const user = await User.findOne({ _id: req.params.id })
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.json(user)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({'_id': req.params.id})
            .then(() => {
                res.redirect('/users')
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}