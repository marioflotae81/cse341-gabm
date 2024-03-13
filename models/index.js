const { client } = require('../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const brokersCollection = database.collection(process.env.MONGO_BROKERS_COLLECTION);
const carriersCollection = database.collection(process.env.MONGO_CARRIERS_COLLECTION);
const clientsCollection = database.collection(process.env.MONGO_CLIENTS_COLLECTION);
const usersCollection = database.collection(process.env.MONGO_USERS_COLLECTION);

/**
 * 
 *  Brokers CRUD
 */


/**
 * 
 *  Carriers CRUD
 */


/**
 * 
 *  Clients CRUD
 */


/**
 * 
 *  Users CRUD
 */

// Create Doc


// Fetch All Docs


// Fetch Single Doc


// Update User
const updateUser = async (data) => {
    const { UserEmail, UserName, UserPicture, UserRole, UserNPN } = data;

    try {
        await client.connect()

        console.log(UserName, UserEmail, UserPicture, UserRole, UserNPN)

        const result = await usersCollection.updateOne(
            {
                UserEmail: UserEmail
            },
            {
                $set: {
                    UserEmail: UserEmail,
                    UserName: UserName,
                    UserPicture: UserPicture,
                    UserRole: UserRole,
                    UserNPN: UserNPN,
                }
            },
            { upsert: true }
        );

        if (!result) {
            throw new Error('There was a problem updating the User')
        }

        return result;

    } catch (error) {
        console.error(error);
    }
};

// Delete User


module.exports = {
    updateUser,
}