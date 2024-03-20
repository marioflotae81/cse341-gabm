const { client } = require('../db');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const database = client.db(process.env.MONGO_DB);
const clientsCollection = database.collection(process.env.MONGO_CLIENTS_COLLECTION);


// Create Client
const insertClient = async (data) => {
    try {
        await client.connect();

        const result = await clientsCollection.insertOne(data);

        if (!result) {
            throw new Error('Sorry, the Client was not created')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};


// Fetch All Docs
const fetchAllClients = async () => {
    try {
        await client.connect();
        
        const result = await clientsCollection.find({}).toArray();

        if (!result) {
            throw new Error('No Clients found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};


// Fetch Single Doc
const fetchOneClient = async (id) => {
    try {
        await client.connect();
        
        const objectId = new ObjectId(id);
        
        const result = await clientsCollection.findOne({ _id: objectId });

        if (!result) {
            throw new Error('Client not found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};



// Update Client
const updateClient = async (data) => {
    let { 
            id, 
            SubscriberFirstName, 
            SubscriberLastName, 
            SubscriberAddress,
            SubscriberEmail, 
            SubscriberPhone, 
            SubscriberPolicy,
            CarrierDocumentId,
            BrokerNPN, 
        } = data;

    try {
        await client.connect();

        const objectId = new ObjectId(id);

        const result = await clientsCollection.findOneAndUpdate(
            {
                _id: objectId
            },
            {
                $set: {
                    SubscriberFirstName,
                    SubscriberLastName,
                    SubscriberAddress,
                    SubscriberEmail,
                    SubscriberPhone,
                    SubscriberPolicy,
                    CarrierDocumentId,
                    BrokerNPN
                }
            },
        );

        if (!result) {
            throw new Error('There was a problem updating the Client.')
        }

        return result;

    } catch (error) {
        console.error(error);
    }
};

// Delete Client
const deleteClient = async (id) => {
    try {
        const objectId = new ObjectId(id);

        await client.connect();

        const result = clientsCollection.deleteOne({ _id: objectId });

        return result;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    insertClient,
    fetchAllClients,
    fetchOneClient,
    updateClient,
    deleteClient,
}