const express = require('express');

const config = require('../config');
const router = require('./network');

const app = express();

app.use(express.json());

// Routes
app.use('/', router);

app.listen(config.mysql_service.port, () => {
    console.log(`My SQL service listening on port: ${config.mysql_service.port}`);
})