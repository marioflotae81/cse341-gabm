const express = require('express');
const app = express();
const { connectToMongoDB } = require('./db/index');
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello!')
});

const port = process.env.PORT || 3003;


connectToMongoDB()
.then(() => {
        app.listen(port, () => {
            console.log('Web Server is listening at port ' + (port));
        });

    })
    .catch(() => {
        console.error('Error connecting to MongoDB', error);
    })