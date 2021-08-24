const express = require('express');

const response = require('../../../network/response');
const Controller = require('./controller');

const router = express.Router();

router.get('/', function(req, res) {
    const user_list = Controller.list();
    response.success(req, res, user_list, 200);
})

module.exports = router;