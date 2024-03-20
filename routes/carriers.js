const routes = require('express').Router();
const carrierControllers = require('../controllers/carriers');

// Insert a User
routes.post('/', carrierControllers.createCarrier);

// Get them All
routes.get('/', carrierControllers.getAllCarriers);

// Get One
routes.get('/:id', carrierControllers.getOneCarrier);

// Update User
routes.put('/:id', carrierControllers.updateOneCarrier);

// Delete User
routes.delete('/:id', carrierControllers.deleteOneCarrier)

module.exports = routes;