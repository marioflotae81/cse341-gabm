const routes = require('express').Router();
const userControllers = require('../controllers/users');

// Get them All
routes.get('/', userControllers.getAll);

// Get One
routes.get('/:id', userControllers.getOne);

module.exports = routes;