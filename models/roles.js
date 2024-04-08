const { client } = require('../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const usersCollection = database.collection(process.env.MONGO_USERS_COLLECTION);

const getRole = async (email) => {
    try {
        await client.connect();
                
        const result = await usersCollection.findOne({ UserEmail: email });

        if (!result) {
            throw new Error('User not found.')
        }

        return result;
    } catch (error) {

    }
};

module.exports = {
    getRole,
}