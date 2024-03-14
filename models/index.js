const { client } = require('../db');
const { ObjectId } = require('mongodb');
const usersCRUD = require('./users');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const brokersCollection = database.collection(process.env.MONGO_BROKERS_COLLECTION);
const carriersCollection = database.collection(process.env.MONGO_CARRIERS_COLLECTION);
const clientsCollection = database.collection(process.env.MONGO_CLIENTS_COLLECTION);
const usersCollection = database.collection(process.env.MONGO_USERS_COLLECTION);


module.exports = {
    usersHandler: usersCRUD
};