const express = require('express');

const config = require('../config.js');
const errors = require('../network/errors');
const post = require('./components/post/network');

const app = express();

// Body Parser
app.use(express.json())

// Router
app.use('/api/post', post);

/**
 * *********** *
 * Middlewares *
 * *********** *
 */
// Error middleware should be the last middleware declared
app.use(errors);

app.listen( config.post.port, () => {
    console.log(`Post service listening on port ${config.post.port}`);
} );