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
const fetchAllClients = async (role, NPN) => {
    let param;
    if (role === 'BROKER') {
        param = { BrokerNPN: NPN }
    } else if (role === 'ADMIN') {
        param = {};
    } else {
        throw new Error('No valid Role.')
    }

    try {
        await client.connect();
        
        const result = await clientsCollection.find(param).toArray();

        if (!result) {
            throw new Error('No Clients found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};


// Fetch Single Doc
const fetchOneClient = async (id, role, NPN) => {
    const objectId = new ObjectId(id);
    let param;

    if (role === 'BROKER') {
        param = { _id: objectId, BrokerNPN: NPN }
    } else if (role === 'ADMIN') {
        param = { _id: objectId };
    } else {
        throw new Error('No valid Role.')
    }

    try {
        await client.connect();
        
        
        const result = await clientsCollection.findOne(param);

        if (!result) {
            throw new Error('Client not found.')
        }

        return result;
    } catch (error) {
        console.error(error);
    }
};



// Update Client
const updateClient = async (data, role, npn) => {
    let filter;
    
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

    const objectId = new ObjectId(id);

        if (role === 'BROKER') {
            filter = { _id: objectId, BrokerNPN: npn }
        } else if (role === 'ADMIN') {
            filter = {  _id: objectId };
        } else {
            throw new Error('No valid Role.')
        }
        try {
            await client.connect();

        const result = await clientsCollection.findOneAndUpdate(
            filter,
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
            throw new Error('No data found.')
        }
            
        return result;

    } catch (error) {
        console.error(error);
    }
};

// Delete Client
const deleteClient = async (id, role, NPN) => {
    
    const objectId = new ObjectId(id);

    let filter;
    if (role === 'BROKER') {
        filter = { _id: objectId, BrokerNPN: NPN }
    } else if (role === 'ADMIN') {
        filter = { _id: objectId };
    } else {
        throw new Error('No valid Role.')
    }

    try {
        
        await client.connect();

        const result = clientsCollection.deleteOne(filter);

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