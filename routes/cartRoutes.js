const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');

// INDEX
// list all items in cart
router.get('/', userController.auth, cartController.listCartItems)

// UPDATE
// backend only functionality that is used to update an item
router.put('/:id', userController.auth, cartController.updateItem)

// DELETE
// backend only functionality that is used to delete an item
router.delete('/:id', userController.auth, cartController.deleteItem)

module.exports = router