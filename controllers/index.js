const { client } = require('../db');

const homeRoute = (req, res) => {
    res.send('Welcome, my friend!')
};

module.exports = {
    homeRoute
}