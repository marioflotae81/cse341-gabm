const { client } = require('../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const usersCollection = database.collection(process.env.MONGO_USERS_COLLECTION);


// Create Doc
const insertUser = async (user) => {
    try {
        await client.connect();

        const result = await usersCollection.insertOne(user);

        if (!result) {
            throw new Error('User was not created')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};


// Fetch All Docs
const fetchAll = async () => {
    try {
        await client.connect();
        
        const result = await usersCollection.find({}).toArray();

        if (!result) {
            throw new Error('No Users found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};


// Fetch Single Doc
const fetchOne = async (id) => {
    try {
        await client.connect();
        
        const objectId = new ObjectId(id);
        
        const result = await usersCollection.findOne({ _id: objectId });

        if (!result) {
            throw new Error('User not found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};

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
const updateUser = async (user) => {
    let { id, UserEmail, UserName, UserPicture, UserRole, UserNPN } = user;

    try {
        await client.connect();

        const objectId = new ObjectId(id);

        const result = await usersCollection.findOneAndUpdate(
            {
                _id: objectId
            },
            {
                $set: {
                    UserEmail: UserEmail,
                    UserName: UserName,
                    UserPicture: UserPicture,
                    UserNPN: UserNPN,
                    UserRole: UserRole,
                }
            },
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
const deleteUser = async (id) => {
    try {
        const objectId = new ObjectId(id);

        await client.connect();

        const result = usersCollection.deleteOne({ _id: objectId });

        return result;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    insertUser,
    fetchAll,
    fetchOne,
    updateUserLogin,
    updateUser,
    deleteUser,
}