const express = require('express');
const cors = require('cors');
const app = express();
const { connectToMongoDB } = require('./db/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
require('./passport')
require('dotenv').config();


const port = process.env.PORT || 3003;

app
    .use(cors())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(session({
        cookie: { maxAge: 86400000 },
        store: new MemoryStore({
            checkPeriod: 86400000
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
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