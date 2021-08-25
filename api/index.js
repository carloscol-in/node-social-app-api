const express = require('express');
const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const errors = require('../network/errors');
const user = require('./components/user/network');
const auth = require('./components/auth/network');

const app = express();

// Swagger Document
const swagger_doc = require('./swagger.json')

// Body Parser
app.use(express.json())

// Router
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger_doc))
app.use('/api/user', user);
app.use('/api/auth', auth);

/**
 * *********** *
 * Middlewares *
 * *********** *
 */
// Error middleware should be the last middleware declared
app.use(errors);

app.listen( config.api.port, () => {
    console.log(`Listening on port ${config.api.port}`);
} );