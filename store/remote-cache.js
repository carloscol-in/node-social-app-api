const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.cache_service.host, config.cache_service.port);