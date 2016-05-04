const Task = require('./Task');
const SASSIngredient = require('../ingredients/SASSIngredient');
const CSSOIngredient = require('../ingredients/CSSOIngredient');
const CSSImportIngredient = require('../ingredients/CSSImportIngredient');
const Timer = require('../Timer');
const Logger = require('../Logger');
const globby = require('globby');

const SASS_SEARCH = [
    '/sass/**/*.scss',
];

class SassTask extends Task {
    run(options) {
        const timer = new Timer;
        timer.start();

        return this.compileSASS(options)
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.info(`SASS task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err);

                return Promise.reject(err);
            });
    }

    getSASSFiles() {
        return globby(this.getRelevantFiles());
    }

    compileSASS(options) {
        return this.getSASSFiles()
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
            .then((result) => this.writeDistFile(this.moduleName, 'sass', 'css',
                result, options.shouldMinify));
    }

    getRelevantFiles() {
        const moduleFolderPath = this.getModuleFolderPath();

        return SASS_SEARCH.map((path) => moduleFolderPath + path);
    }
}

module.exports = SassTask;
