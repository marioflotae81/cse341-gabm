const { client } = require('../db');
const { clientsHandler } = require('../models');

// create a Client
const createClient = async (req, res) => {
    let npn;
    // Validate data
    if(
        !req.body.SubscriberFirstName ||
        !req.body.SubscriberLastName ||
        !req.body.SubscriberAddress ||
        !req.body.SubscriberEmail ||
        !req.body.SubscriberPhone ||
        !req.body.SubscriberPolicy ||
        !req.body.CarrierDocumentId ||
        !req.body.BrokerNPN
    ) {
        return res.status(400).send({ error: 'Content can\'t be empty.' });
    }

    if (!req.userRole || !req.userBrokerNPN) {
        return res.status(401).json({ error: 'No Valid Role or NPN'});
    }

    if (req.userRole === 'BROKER') {
        npn = req.userBrokerNPN;
    } else if (req.userRole === 'ADMIN') {
        npn = req.body.BrokerNPN;
    } else {
        return res.status(401).json({ error: 'No Valid Role' });
    }

    // Create Client Object
    const subscriber = {
        SubscriberFirstName: req.body.SubscriberFirstName,
        SubscriberLastName: req.body.SubscriberLastName,
        SubscriberAddress: req.body.SubscriberAddress,
        SubscriberEmail: req.body.SubscriberEmail,
        SubscriberPhone: req.body.SubscriberPhone,
        SubscriberPolicy: req.body.SubscriberPolicy,
        CarrierDocumentId: req.body.CarrierDocumentId,
        BrokerNPN: npn,
    };

    try {
        const result = await clientsHandler.insertClient(subscriber);

        if (!result) {
            throw new Error('There was a problem creating the Client.')
        } else {
            return res.status(201).json({
                message: `New Client Id: ${(await result).insertedId}`
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

// fetch all Clients
const getAllClients = async (req, res) => {
    const role = req.userRole;
    const NPN = req.userBrokerNPN;
    if (!role || !NPN) {
        return res.status(401).json({ error: 'No Valid Role or NPN.' });
    }

    try {
        const data = await clientsHandler.fetchAllClients(role, NPN);

        if (!data) {
            throw new Error('No data')
        }
        return res.send(data);
    } catch (error) {
        console.error;
        res.status(500).json({ 
            error: error.message || "There was an error fetching the Clients." 
        });
    } finally {
        client.close();
    }
};

// fetch one Client
const getOneClient = async (req, res) => {
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    const role = req.userRole;
    const NPN = req.userBrokerNPN;
    if (!role || !NPN) {
        return res.status(401).json({ error: 'No Valid Role or NPN.' });
    }

    try {
        const subscriber = await clientsHandler.fetchOneClient(id, role, NPN);

        if (!subscriber) {
            throw new Error('No Client found')
        }

        return res.send(subscriber);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        })
    } finally {
        client.close();
    }
};


// Update Client
const updateOneClient = async (req, res) => {
    let npn = req.userBrokerNPN;
    let role = req.userRole;
    const id = req.params.id;
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    if (
        !req.body.SubscriberFirstName ||
        !req.body.SubscriberLastName ||
        !req.body.SubscriberAddress ||
        !req.body.SubscriberEmail ||
        !req.body.SubscriberPhone ||
        !req.body.SubscriberPolicy ||
        !req.body.CarrierDocumentId ||
        !req.body.BrokerNPN
        ) {
        return res.status(400).json({
            error: 'Bad Request. No data provided.'
        })
    }

    if (!role || !npn) {
        return res.status(401).json({ error: 'No Valid Role or NPN'});
    }

    if (role === 'BROKER') {
        npn = req.userBrokerNPN;
    } else if (role === 'ADMIN') {
        npn = req.body.BrokerNPN;
    } else {
        return res.status(401).json({ error: 'No Valid Role' });
    }

    // Create Client Object
    const subscriber = {
        id: req.params.id,
        SubscriberFirstName: req.body.SubscriberFirstName,
        SubscriberLastName: req.body.SubscriberLastName,
        SubscriberAddress: req.body.SubscriberAddress,
        SubscriberEmail: req.body.SubscriberEmail,
        SubscriberPhone: req.body.SubscriberPhone,
        SubscriberPolicy: req.body.SubscriberPolicy,
        CarrierDocumentId: req.body.CarrierDocumentId,
        BrokerNPN: npn,
    };

    try {
        const result = await clientsHandler.updateClient(subscriber, role, npn);

        if (result) {
            return res.status(200).json({ message: "Client was updated Successfully." })
        } else {
            return res.status(400).json({ error: "No Client Found :/" })
        }
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error.'
        });
    } finally {
        client.close();
    }
};

//Delete Client
const deleteOneClient = async (req, res) => {
    const role = req.userRole;
    const NPN = req.userBrokerNPN;
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    try {
        const result = await clientsHandler.deleteClient(id, role, NPN);

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: "Client was deleted successfully." })
        } else if (result.deletedCount === 0) {
            return res.status(400).json({ error: "No Client Found." });
        } else {
            return res.status(400).json({ error: "Something went wrong, sorry." });
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
    createClient,
    getAllClients,
    getOneClient,
    updateOneClient,
    deleteOneClient,
};