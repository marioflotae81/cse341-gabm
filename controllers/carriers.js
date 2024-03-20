const { client } = require('../db');
const { carriersHandler } = require('../models');

// create a Carrier
const createCarrier = async (req, res) => {
    // Validate data
    if(
        !req.body.CarrierName ||
        !req.body.CarrierState ||
        !req.body.CarrierWebsite
    ) {
        return res.status(400).send({ error: 'Content can\'t be empty.' });
    }

    // Create Carrier Object
    const carrier = {
        CarrierName: req.body.CarrierName,
        CarrierState: req.body.CarrierState,
        CarrierWebsite: req.body.CarrierWebsite,
    };

    try {
        const result = await carriersHandler.insertCarrier(carrier);

        if (!result) {
            throw new Error('There was a problem creating the user')
        } else {
            return res.status(201).json({
                message: `New Carrier Id: ${(await result).insertedId}`
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

// fetch all Carriers
const getAllCarriers = async (req, res) => {
    try {
        const data = await carriersHandler.fetchAllCarriers();

        if (!data) {
            throw new Error('No data')
        }
        return res.send(data);
    } catch (error) {
        console.error;
        res.status(500).json({ 
            error: error.message || "There was an error fetching the Carriers." 
        });
    } finally {
        client.close();
    }
};

// fetch one Carrier
const getOneCarrier = async (req, res) => {
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    try {
        const carrier = await carriersHandler.fetchOneCarrier(id);

        if (!carrier) {
            throw new Error('No Carrier found')
        }

        return res.send(carrier);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        })
    } finally {
        client.close();
    }
};


// Update Carrier
const updateOneCarrier = async (req, res) => {
    const id = req.params.id;
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    if (
        !req.body.CarrierName || 
        !req.body.CarrierState ||
        !req.body.CarrierWebsite
        ) {
        return res.status(400).json({
            error: 'Bad Request. No data provided.'
        })
    }

    // Create Carrier Object
    const carrier = {
        id: req.params.id,
        CarrierName: req.body.CarrierName,
        CarrierState: req.body.CarrierState,
        CarrierWebsite: req.body.CarrierWebsite,
    };

    try {
        const result = await carriersHandler.updateCarrier(carrier);

        if (result) {
            return res.status(200).json({ message: "Carrier was updated Successfully." })
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

//Delete Carrier
const deleteOneCarrier = async (req, res) => {
    const id = req.params.id
    if (id.length !== 24) {
        return res.status(404).json({
            error: 'Not a valid ID.'
        });
    }

    try {
        const result = await carriersHandler.deleteCarrier(id);

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: "Carrier was deleted successfully." })
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
    createCarrier,
    getAllCarriers,
    getOneCarrier,
    updateOneCarrier,
    deleteOneCarrier,
};