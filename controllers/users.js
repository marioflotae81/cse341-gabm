const { client } = require('../db');
const { usersHandler } = require('../models');
const { updateUserLogin } = require('../models/users');

// create a user
const createUser = async (req, res) => {
    // Validate data
    if(
        !req.body.UserEmail ||
        !req.body.UserName ||
        !req.body.UserNPN ||
        !req.body.UserRole
    ) {
        res.status(400).send({ error: 'Content can\'t be empty.' });
    }

    // Create User Object
    const user = {
        UserEmail: req.body.UserEmail,
        UserName: req.body.UserName,
        UserPicture: req.body.UserPicture,
        UserNPN: req.body.UserNPN,
        UserRole: req.body.UserRole
    };

    try {
        const result = await usersHandler.insertUser(user);

        if (!result) {
            throw new Error('There was a problem creating the user')
        } else {
            return res.status(201).json({
                message: `New User Id: ${(await result).insertedId}`
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    } finally {
        client.close();
    }
};

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
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    try {
        const user = await usersHandler.fetchOne(id);

        if (!user) {
            throw new Error('No user found')
        }

        return res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        })
    } finally {
        client.close();
    }
};


// Update User
const updateOneUser = async (req, res) => {
    const id = req.params.id;
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    if (!req.body.UserEmail || !req.body.UserName) {
        return res.status(400).json({
            error: 'Bad Request. No data provided.'
        })
    }

    // Create User Object
    const user = {
        id: req.params.id,
        UserEmail: req.body.UserEmail,
        UserName: req.body.UserName,
        UserPicture: req.body.UserPicture,
        UserNPN: req.body.UserNPN,
        UserRole: req.body.UserRole
    };

    try {
        const result = await usersHandler.updateUser(user);

        if (result) {
            return res.status(200).json({ message: "User was updated Successfully." })
        } else {
            return res.status(400).json({ error: "Something went wrong :/" })
        }
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    } finally {
        client.close();
    }
};

//Delete User
const deleteOneUser = async (req, res) => {
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    try {
        const result = await usersHandler.deleteUser(id);

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: "User was deleted successfully." })
        } else {
            return res.status(400).json({ error: "Something went wrong, sorry." })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error.'
        })
    } finally {
        client.close();
    }

};

module.exports = {
    createUser,
    getAll,
    getOne,
    updateOneUser,
    deleteOneUser
};