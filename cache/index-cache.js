const express = require('express');

const config = require('../config');
const router = require('./network');

const app = express();

app.use(express.json());

// Routes
app.use('/', router);

app.listen(config.cache_service.port, () => {
    console.log(`My Cache Redis service listening on port: ${config.cache_service.port}`);
})