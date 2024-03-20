const routes = require('express').Router();
const clientControllers = require('../controllers/clients');

// Insert a Client
routes.post('/', clientControllers.createClient);

// Get them All
routes.get('/', clientControllers.getAllClients);

// Get One
routes.get('/:id', clientControllers.getOneClient);

// Update Broker
routes.put('/:id', clientControllers.updateOneClient);

// Delete Broker
routes.delete('/:id', clientControllers.deleteOneClient);

module.exports = routes;