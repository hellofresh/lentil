const Task = require('./Task');

const JS_SEARCH = [
    '/**/*Spec.js'
];

class KarmaTask extends Task {
    run(options) {
        const timer = new Timer;
        timer.start();

        return this.compileJs(options)
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.info(`JS task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err);
            });
    }
}

module.exports = KarmaTask
