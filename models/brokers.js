const { client } = require('../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const brokersCollection = database.collection(process.env.MONGO_BROKERS_COLLECTION);


// Create Broker
const insertBroker = async (data) => {
    try {
        await client.connect();

        const result = await brokersCollection.insertOne(data);

        if (!result) {
            throw new Error('Sorry, the Broker was not created')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};


// Fetch All Docs
const fetchAllBrokers = async () => {
    try {
        await client.connect();
        
        const result = await brokersCollection.find({}).toArray();

        if (!result) {
            throw new Error('No Brokers found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};


// Fetch Single Doc
const fetchOneBroker = async (id) => {
    try {
        await client.connect();
        
        const objectId = new ObjectId(id);
        
        const result = await brokersCollection.findOne({ _id: objectId });

        if (!result) {
            throw new Error('Broker not found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};



// Update Broker
const updateBroker = async (data) => {
    let { 
            id, 
            NPN,
            BrokerFirstName, 
            BrokerLastName, 
            BrokerEmail, 
            BrokerPhone, 
            Agency 
        } = data;

    try {
        await client.connect();

        const objectId = new ObjectId(id);

        const result = await brokersCollection.findOneAndUpdate(
            {
                _id: objectId
            },
            {
                $set: {
                    NPN: NPN,
                    BrokerFirstName: BrokerFirstName,
                    BrokerLastName: BrokerLastName,
                    BrokerEmail: BrokerEmail,
                    BrokerPhone: BrokerPhone,
                    Agency: Agency,
                }
            },
        );

        if (!result) {
            throw new Error('There was a problem updating the Broker')
        }

        return result;

    } catch (error) {
        console.error(error);
    }
};

// Delete Broker
const deleteBroker = async (id) => {
    try {
        const objectId = new ObjectId(id);

        await client.connect();

        const result = brokersCollection.deleteOne({ _id: objectId });

        return result;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    insertBroker,
    fetchAllBrokers,
    fetchOneBroker,
    updateBroker,
    deleteBroker,
}