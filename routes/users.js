const routes = require('express').Router();
const userControllers = require('../controllers/users');

// Insert a User
routes.post('/', userControllers.createUser);

// Get them All
routes.get('/', userControllers.getAll);

// Get One
routes.get('/:id', userControllers.getOne);

// Update User
routes.put('/:id', userControllers.updateOneUser)

module.exports = routes;