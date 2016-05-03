const Task = require('./Task');
const SASSIngredient = require('../ingredients/SASSIngredient');
const Timer = require('../Timer');
const Logger = require('../Logger');
const glob = require('multi-glob').glob;

const SASS_SEARCH = [
    '/sass/**/*.scss'
];

class SassTask extends Task {
    run(options) {
        const moduleFolderPath = this.getModuleFolderPath();

        const timer = new Timer;
        timer.start();

        return this.compileSASS(options, moduleFolderPath)
            .then((css) => {
                Logger.debug('Compiled CSS', css);

                return Promise.resolve(css);
            })
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.log(`SASS task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err);
            });
    }

    getSASSFiles(moduleFolderPath) {
        return new Promise((resolve, reject) => {
            glob(SASS_SEARCH.map((path) => {
                return moduleFolderPath + path;
            }), (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
    }

    compileSASS(options, moduleFolderPath) {
        return this.getSASSFiles(moduleFolderPath)
            .then((files) => {
                Logger.debug('Compiling the following SASS files:', files);

                var sassIngredient = new SASSIngredient(this.config, options);

                return sassIngredient.run(files);
            })
            .then()
            .then((css) => {
                return css;
            });
    }
}

module.exports = SassTask;
