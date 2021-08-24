const express = require('express');
const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');

const app = express();

// Swagger Document
const swagger_doc = require('./swagger.json')

// Body Parser
app.use(express.json())

// Router
app.use('/api/user', user);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger_doc))

app.listen( config.api.port, () => {
    console.log(`Listening on port ${config.api.port}`);
} );