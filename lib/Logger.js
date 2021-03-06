/* eslint-disable no-console */

const chalk = require('chalk');

let logLevel = process.env.LOG_LEVEL || 0;

module.exports.setLogLevel = (newLogLevel) => {
    if (Number.isInteger(newLogLevel)) {
        logLevel = newLogLevel;
    } else if (Number.isInteger(process.env.LOG_LEVEL)) {
        logLevel = process.env.LOG_LEVEL;
    } else {
        logLevel = 2;
    }
};

module.exports.emergency = (err) => {
    if (logLevel > LEVELS.ERROR) {
        return;
    }

    console.error(baseMessage() + chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
};

module.exports.alert = (err) => {
    if (logLevel > LEVELS.ERROR) {
        return;
    }

    console.error(baseMessage() + chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
};

module.exports.critical = (err) => {
    if (logLevel > LEVELS.ERROR) {
        return;
    }

    console.error(baseMessage() + chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
};

module.exports.error = (err) => {
    if (logLevel > LEVELS.ERROR) {
        return;
    }

    console.error(baseMessage() + chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
};

module.exports.warning = (err) => {
    if (logLevel > LEVELS.WARN) {
        return;
    }

    console.error(baseMessage() + chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
};

module.exports.notice = (message, context) => {
    if (logLevel > LEVELS.INFO) {
        return;
    }

    console.log(baseMessage() + message, context || []);
};

module.exports.info = (message, context) => {
    if (logLevel > LEVELS.INFO) {
        return;
    }

    console.log(baseMessage() + message, context || []);
};

module.exports.debug = (message, context) => {
    if (logLevel > LEVELS.DEBUG) {
        return;
    }

    console.log(baseMessage() + message, context || []);
};

module.exports.log = (message, context) => {
    if (logLevel > LEVELS.TRACE) {
        return;
    }

    console.log(baseMessage() + message, context || []);
};

const LEVELS = {
    TRACE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    SILENT: 5
};

const baseMessage = (message) => {
    return '[' + chalk.grey(dateFormat()) + '] ';
};

const dateFormat = (date) => {
    const useDate = date || new Date();

    const hours = zerofill(useDate.getHours());
    const minutes = zerofill(useDate.getMinutes());
    const seconds = zerofill(useDate.getSeconds());
    const milliseconds = zerofill(useDate.getMilliseconds(), 3);

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const zerofill = (n, length = 2) => {
    n = n + '';
    return n.length > length ? n : new Array(length - n.length + 1).join('0') + n;
};
