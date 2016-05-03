const Task = require('./Task');
const SASSIngredient = require('../ingredients/SASSIngredient');
const CSSOIngredient = require('../ingredients/CSSOIngredient');
const CSSImportIngredient = require('../ingredients/CSSImportIngredient');
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
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.log(`SASS task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err.message, err);
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

                const sassIngredient = new SASSIngredient(this.config, options);

                return sassIngredient.run(files);
            })
            .then((css) => {
                const cssImportIngredient = new CSSImportIngredient(this.config, options);

                return cssImportIngredient.run(this.moduleName, css);
            })
            .then((css) => {
                if (!options.shouldMinify) {
                    return Promise.resolve(css);
                }

                const cssoIngredient = new CSSOIngredient(this.config, options);

                return cssoIngredient.run(css);
            })
            .then((result) => {
                return this.writeDistFile(this.moduleName, 'sass', 'css', result, options.shouldMinify);
            });
    }
}

module.exports = SassTask;
