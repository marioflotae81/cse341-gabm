const routes = require('express').Router();
const controllers = require('../controllers');


routes.get('/', controllers.homeRoute);

module.exports = routes;