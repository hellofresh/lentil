/* eslint-disable no-console */

const chalk = require('chalk');

var logLevel = process.env.LOG_LEVEL || 0;

module.exports = {
    setLogLevel: (newLogLevel) => {
        logLevel = newLogLevel;
    },
    emergency: (err) => {
        if (logLevel > LEVELS.ERROR) {
            return;
        }

        process.stderr.write(baseMessage());

        console.error(chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
    },
    alert: (err) => {
        if (logLevel > LEVELS.ERROR) {
            return;
        }

        process.stderr.write(baseMessage());

        console.error(chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
    },
    critical: (err) => {
        if (logLevel > LEVELS.ERROR) {
            return;
        }

        process.stderr.write(baseMessage());

        console.error(chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
    },
    error: (err) => {
        if (logLevel > LEVELS.ERROR) {
            return;
        }

        process.stderr.write(baseMessage());

        console.error(chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
    },
    warning: (err) => {
        if (logLevel > LEVELS.WARN) {
            return;
        }

        process.stderr.write(baseMessage());

        console.error(chalk.red(err.message), logLevel <= LEVELS.DEBUG ? err.stack : []);
    },
    notice: (message, context) => {
        if (logLevel > LEVELS.INFO) {
            return;
        }

        process.stdout.write(baseMessage());

        console.log(message, context || []);
    },
    info: (message, context) => {
        if (logLevel > LEVELS.INFO) {
            return;
        }

        process.stdout.write(baseMessage());

        console.log(message, context || []);
    },
    debug: (message, context) => {
        if (logLevel > LEVELS.DEBUG) {
            return;
        }

        process.stdout.write(baseMessage());

        console.log(message, context || []);
    },
    log: (message, context) => {
        if (logLevel > LEVELS.TRACE) {
            return;
        }

        process.stdout.write(baseMessage());

        console.log(message, context || []);
    }
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
}

const dateFormat = (date) => {
    const useDate = date || new Date();

    const hours = zerofill(useDate.getUTCHours());
    const minutes = zerofill(useDate.getUTCMinutes());
    const seconds = zerofill(useDate.getUTCSeconds());
    const milliseconds = zerofill(useDate.getUTCMilliseconds(), 3);

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

const zerofill = (n, length = 2) => {
    n = n + '';
    return n.length > length ? n : new Array(length - n.length + 1).join('0') + n;
}
