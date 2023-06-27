const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');

// INDEX
// list all items
router.get('/', itemController.listItems)

// NEW
// show the item a form to fill out to create a item
// router.get('/new', itemController.newItem)

// CREATE
// backend only functionality that is used to create a item
router.post('/', userController.auth, itemController.createItem)

// SHOW
// shows you specific item's login page after successful login
router.get('/:id', itemController.showItem)

// EDIT
// show you a form that lets you edit the item
// router.get('/:id/edit', itemController.editItem)

// UPDATE
// backend only functionality that is used to update a item
router.put('/:id', userController.auth, itemController.updateItem)

// DELETE
// backend only functionality that is used to delete a item
router.delete('/:id', userController.auth, itemController.deleteItem)

// add an item to your cart
router.post('/:id', userController.auth, itemController.addToCart)

module.exports = router