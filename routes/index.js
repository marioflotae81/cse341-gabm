const routes = require('express').Router();
const passport = require('passport');
const controllers = require('../controllers');
const broker = require('./brokers');
const carrier = require('./carriers');
const client = require('./clients');
const user = require('./users');
require('../passport');


routes.get('/', controllers.isLoggedIn, controllers.homeRoute);

routes.get('/home', controllers.home);

routes.get('/login',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
);

routes.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed'
    }),
    controllers.googleCallbackRoute
);

routes.get('/success', controllers.isLoggedIn, controllers.successRoute);

routes.get('/logout', controllers.logoutRoute);

routes.get('/failed', controllers.failedRoute);

routes.use('/users', controllers.isLoggedIn, user);

routes.use('/carriers', controllers.isLoggedIn, carrier);

routes.use('/brokers', controllers.isLoggedIn, broker);

routes.use('/clients', controllers.isLoggedIn, client);

module.exports = routes;