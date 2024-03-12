const express = require('express');
const cors = require('cors');
const app = express();
const { connectToMongoDB } = require('./db/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();


const port = process.env.PORT || 3003;

app
    .use(cors())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes'))


connectToMongoDB()
.then(() => {
        app.listen(port, () => {
            console.log('Web Server is listening at port ' + (port));
        });

    })
    .catch(() => {
        console.error('Error connecting to MongoDB', error);
    })