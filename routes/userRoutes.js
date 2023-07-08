const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// INDEX
// list all users
router.get('/', userController.listUsers)

// CREATE
// backend only functionality that is used to create a user
router.post('/', userController.createUser)

// Non-RESTful route to login a user
router.post('/login', userController.loginUser)

// SHOW
// shows you specific user's login page after successful login
router.get('/:id', userController.showUser)

// UPDATE
// backend only functionality that is used to update a user
router.put('/:id', userController.auth, userController.updateUser)

// DELETE
// backend only functionality that is used to delete a user
router.delete('/:id', userController.auth, userController.deleteUser)

// Non-RESTful route to logout a user
router.post('/logout', userController.auth, userController.logoutUser)

module.exports = router