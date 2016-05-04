const Task = require('./Task');
const Timer = require('../Timer');
const Logger = require('../Logger');
const KarmaIngredient = require('../ingredients/KarmaIngredient');
const path = require('path');

const JS_SEARCH = [
    '/**/*Spec.js'
];

class LintTask extends Task {
    run(options) {
        const timer = new Timer;
        timer.start();

        return this.runKarma(options)
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.info(`Karma task for ${this.moduleName} finished in: ${time}.`);
            });
    }

    runKarma(options) {
        const karmaIngredient = new KarmaIngredient(this.config, options);

        return karmaIngredient.run();
    }

    getRelevantFiles() {
        const karmaIngredient = new KarmaIngredient(this.config);

        const configFile = karmaIngredient.getConfigFile();

        var files = [];
        require(configFile)({
            set: (config) => {
                files = config.files;
            }
        });

        return files.map((file) => {
            return path.join(path.dirname(configFile), file);
        });
    }
}

module.exports = LintTask;