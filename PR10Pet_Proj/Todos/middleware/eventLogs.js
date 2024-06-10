const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvent = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        const logsDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir);
        }
        await fsPromises.appendFile(path.join(logsDir, logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const eventLogs = (req, res, next) => {
    const message = `${req.method} ${req.url}`;
    logEvent(message, 'requestTracing.txt');
    next();
};

module.exports = { eventLogs, logEvent };
