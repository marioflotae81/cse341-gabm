const routes = require('express').Router();
const brokerControllers = require('../controllers/brokers');

// Insert a Broker
routes.post('/', brokerControllers.createBroker);

// Get them All
routes.get('/', brokerControllers.getAllBrokers);

// Get One
routes.get('/:id', brokerControllers.getOneBroker);

// Update Broker
routes.put('/:id', brokerControllers.updateOneBroker);

// Delete Broker
routes.delete('/:id', brokerControllers.deleteOneBroker);

module.exports = routes;