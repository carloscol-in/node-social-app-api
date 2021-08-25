const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// user routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
// follow routes
router.get('/:id/following', following);
router.get('/:id/followers', followers);
router.post('/follow/:id', secure('logged'), follow);

function list (req, res, next) {
    Controller.list()
        .then((user_list) => {
            response.success(req, res, user_list, 200);
        })
        .catch(next);
}

function get (req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function upsert (req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next)
}

function follow (req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function followers (req, res, next) {
    Controller.followers(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function following (req, res, next) {
    Controller.following(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;