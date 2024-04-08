const usersCRUD = require('./users');
const carriersCRUD = require('./carriers');
const brokersCRUD = require('./brokers');
const clientsCRUD = require('./clients');
const rolesCheck = require('./roles')
require('dotenv').config();

module.exports = {
    usersHandler: usersCRUD,
    carriersHandler: carriersCRUD,
    brokersHandler: brokersCRUD,
    clientsHandler: clientsCRUD,
    rolesCheck,
};