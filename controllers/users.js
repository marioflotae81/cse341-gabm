const { client } = require('../db');
const { usersHandler } = require('../models');

// fetch all users
const getAll = async (req, res) => {
    try {
        const data = await usersHandler.fetchAll();

        if (!data) {
            throw new Error('No data')
        }
        return res.send(data);
    } catch (error) {
        console.error;
        res.status(500).json({ error: error.message || "There was an error fetching the users." })
    } finally {
        client.close();
    }
};

// fetch one user
const getOne = async (req, res) => {
    
};

module.exports = {
    getAll,
    getOne,
};