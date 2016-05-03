module.exports = {
    emergency: (err) => {
        console.error(err.message, err.stack);
    },
    alert: (err) => {
        console.error(err.message, err.stack);
    },
    critical: (err) => {
        console.error(err.message, err.stack);
    },
    error: (err) => {
        console.error(err.message, err.stack);
    },
    warning: (err) => {
        console.error(err.message, err.stack);
    },
    notice: (message, context) => {
        console.log(message, context || []);
    },
    info: (message, context) => {
        console.log(message, context || []);
    },
    debug: (message, context) => {
        console.log(message, context || []);
    },
    log: (message, context) => {
        console.log(message, context || []);
    }
};
