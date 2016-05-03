/* eslint-disable no-console */

const chalk = require('chalk');

module.exports = {
    emergency: (err) => {
        process.stderr.write(baseMessage());

        console.error(err.message, err.stack);
    },
    alert: (err) => {
        process.stderr.write(baseMessage());

        console.error(err.message, err.stack);
    },
    critical: (err) => {
        process.stderr.write(baseMessage());

        console.error(err.message, err.stack);
    },
    error: (err) => {
        process.stderr.write(baseMessage());

        console.error(err.message, err.stack);
    },
    warning: (err) => {
        process.stderr.write(baseMessage());

        console.error(err.message, err.stack);
    },
    notice: (message, context) => {
        process.stdout.write(baseMessage());

        console.log(message, context || []);
    },
    info: (message, context) => {
        process.stdout.write(baseMessage());

        console.log(message, context || []);
    },
    debug: (message, context) => {
        process.stdout.write(baseMessage());

        console.log(message, context || []);
    },
    log: (message, context) => {
        process.stdout.write(baseMessage());

        console.log(message, context || []);
    }
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
    return n.length >= length ? n : new Array(length - n.length + 1).join('0') + n;
}
