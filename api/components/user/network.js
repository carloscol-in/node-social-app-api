const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);

function list (req, res) {
    Controller.list()
        .then((user_list) => {
            response.success(req, res, user_list, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function get (req, res) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function upsert (req, res) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((err) => {
            response.error(req, res, err, 500);
        })
}

module.exports = router;