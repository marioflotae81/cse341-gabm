const { client } = require('../db');
const { brokersHandler } = require('../models');

// create a Broker
const createBroker = async (req, res) => {
    // Validate data
    if(
        !req.body.NPN ||
        !req.body.BrokerFirstName ||
        !req.body.BrokerLastName ||
        !req.body.BrokerEmail ||
        !req.body.BrokerPhone ||
        !req.body.Agency
    ) {
        return res.status(400).send({ error: 'Content can\'t be empty.' });
    }

    // Create Broker Object
    const broker = {
        NPN: req.body.NPN,
        BrokerFirstName: req.body.BrokerFirstName,
        BrokerLastName: req.body.BrokerLastName,
        BrokerEmail: req.body.BrokerEmail,
        BrokerPhone: req.body.BrokerPhone,
        Agency: req.body.Agency,
    };

    try {
        const result = await brokersHandler.insertBroker(broker);

        if (!result) {
            throw new Error('There was a problem creating the Broker.')
        } else {
            return res.status(201).json({
                message: `New Broker Id: ${(await result).insertedId}`
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

// fetch all Brokers
const getAllBrokers = async (req, res) => {
    try {
        const data = await brokersHandler.fetchAllBrokers();

        if (!data) {
            throw new Error('No data')
        }
        return res.send(data);
    } catch (error) {
        console.error;
        res.status(500).json({ 
            error: error.message || "There was an error fetching the Brokers." 
        });
    } finally {
        client.close();
    }
};

// fetch one Broker
const getOneBroker = async (req, res) => {
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    try {
        const broker = await brokersHandler.fetchOneBroker(id);

        if (!broker) {
            throw new Error('No Broker found')
        }

        return res.send(broker);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        })
    } finally {
        client.close();
    }
};


// Update Broker
const updateOneBroker = async (req, res) => {
    const id = req.params.id;
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    if (
        !req.body.NPN ||
        !req.body.BrokerFirstName ||
        !req.body.BrokerLastName ||
        !req.body.BrokerEmail ||
        !req.body.BrokerPhone ||
        !req.body.Agency
        ) {
        return res.status(400).json({
            error: 'Bad Request. No data provided.'
        })
    }

    // Create Broker Object
    const broker = {
        id: req.params.id,
        NPN: req.body.NPN,
        BrokerFirstName: req.body.BrokerFirstName,
        BrokerLastName: req.body.BrokerLastName,
        BrokerEmail: req.body.BrokerEmail,
        BrokerPhone: req.body.BrokerPhone,
        Agency: req.body.Agency,
    };

    try {
        const result = await brokersHandler.updateBroker(broker);

        if (result) {
            return res.status(200).json({ message: "Broker was updated Successfully." })
        } else {
            return res.status(400).json({ error: "Something went wrong :/" })
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

//Delete Broker
const deleteOneBroker = async (req, res) => {
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    try {
        const result = await brokersHandler.deleteBroker(id);

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: "Broker was deleted successfully." })
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
    createBroker,
    getAllBrokers,
    getOneBroker,
    updateOneBroker,
    deleteOneBroker,
};