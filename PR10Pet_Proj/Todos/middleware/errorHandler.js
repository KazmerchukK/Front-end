const { logEvent } = require('./eventLogs');

const errorHandler = (err, req, res, next) => {
    const message = `${err.name}: ${err.message}`;
    logEvent(message, 'error.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
};

module.exports = errorHandler;
