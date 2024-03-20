const { client } = require('../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const carriersCollection = database.collection(process.env.MONGO_CARRIERS_COLLECTION);


// Create Carrier
const insertCarrier = async (data) => {
    try {
        await client.connect();

        const result = await carriersCollection.insertOne(data);

        if (!result) {
            throw new Error('Sorry, the Carrier was not created')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};


// Fetch All Docs
const fetchAllCarriers = async () => {
    try {
        await client.connect();
        
        const result = await carriersCollection.find({}).toArray();

        if (!result) {
            throw new Error('No Carriers found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};


// Fetch Single Doc
const fetchOneCarrier = async (id) => {
    try {
        await client.connect();
        
        const objectId = new ObjectId(id);
        
        const result = await carriersCollection.findOne({ _id: objectId });

        if (!result) {
            throw new Error('Carrier not found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};



// Update Carrier
const updateCarrier = async (data) => {
    let { id, CarrierName, CarrierState, CarrierWebsite } = data;

    try {
        await client.connect();

        const objectId = new ObjectId(id);

        const result = await carriersCollection.findOneAndUpdate(
            {
                _id: objectId
            },
            {
                $set: {
                    CarrierName: CarrierName,
                    CarrierState: CarrierState,
                    CarrierWebsite: CarrierWebsite,
                }
            },
        );

        if (!result) {
            throw new Error('There was a problem updating the Carrier')
        }

        return result;

    } catch (error) {
        console.error(error);
    }
};

// Delete Carrier
const deleteCarrier = async (id) => {
    try {
        const objectId = new ObjectId(id);

        await client.connect();

        const result = carriersCollection.deleteOne({ _id: objectId });

        return result;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    insertCarrier,
    fetchAllCarriers,
    fetchOneCarrier,
    updateCarrier,
    deleteCarrier,
}