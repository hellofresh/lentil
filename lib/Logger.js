module.exports = {
    emergency: (message, context) => {
        console.error(message, context || []);
    },
    alert: (message, context) => {
        console.error(message, context || []);
    },
    critical: (message, context) => {
        console.error(message, context || []);
    },
    error: (message, context) => {
        console.error(message, context || []);
    },
    warning: (message, context) => {
        console.error(message, context || []);
    },
    notice: (message, context) => {
        console.log(message, context || []);
    },
    info: (message, context) => {
        console.log(message, context || []);
    },
    debug: (message, context) => {
        // console.log(message, context || []);
    },
    log: (message, context) => {
        console.log(message, context || []);
    }
};
