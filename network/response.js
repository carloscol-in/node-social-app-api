exports.success = function (req, res, message, status) {
    let status_code = status || 200;
    let status_message = message || '';

    res.status(status_code).send({
        error: false,
        status: status_code,
        body: status_message,
    })
}

exports.error = function (req, res, message, status) {
    let status_code = status || 500;
    let status_message = message || 'Internal server error';

    res.status(status_code).send({
        error: false,
        status: status_code,
        body: status_message,
    })
}