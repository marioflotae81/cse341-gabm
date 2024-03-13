const { client } = require('../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const usersCollection = database.collection(process.env.MONGO_USERS_COLLECTION);


// Create Doc


// Fetch All Docs


// Fetch Single Doc


// Update User at Login
const updateUserLogin = async (data) => {
    let { UserEmail, UserName, UserPicture, UserRole, UserNPN } = data;

    try {
        await client.connect();

        const user = await usersCollection.findOne({ UserEmail: UserEmail });

        if (user) {
            UserRole = user.UserRole,
            UserNPN = user.UserNPN
        }

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


// Update User


// Delete User

module.exports = {
    updateUserLogin,
}