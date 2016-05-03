const humanize = require('tiny-human-time');

class Timer {
    constructor() {
        this.currentTime = null;
    }

    start() {
        this.currentTime = process.hrtime();

        return this;
    }

    end() {
        this.totalTime = process.hrtime(this.currentTime);
        this.currentTime = null;

        return this;
    }

    humanize() {
        return humanize(this.totalTime);
    }
}

module.exports = Timer;
