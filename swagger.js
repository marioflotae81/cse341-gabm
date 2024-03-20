const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'GABM',
        description: 'Final Project. General Agency Broker Management.'
    },
    host: 'https://cse341-gabm.onrender.com',
    // host: 'localhost:3003',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endPointFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endPointFile, doc);