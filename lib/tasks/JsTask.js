const Task = require('./Task');
const BabelIngredient = require('../ingredients/BabelIngredient');
const UglifyIngredient = require('../ingredients/UglifyIngredient');
const globby = require('globby');
const Logger = require('../Logger');
const Timer = require('../Timer');
const FileSystem = require('../FileSystem');

const JS_SEARCH = [
    '/js/**/*.js',
    '!/**/*Spec.js',
];

class JsTask extends Task {
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

                return Promise.reject(err);
            });
    }

    getJsFiles() {
        return globby(this.getRelevantFiles());
    }

    compileJs(options) {
        return this.getJsFiles()
            .then(files => {
                Logger.debug('Compiling the following JS files:', files);

                return FileSystem.concat(files);
            })
            .then(contents => {
                if (!options.babel) {
                    return Promise.resolve(contents);
                }

                const babelIngredient = new BabelIngredient(this.config, options);

                const transpiled = babelIngredient.run(contents);
                Logger.debug('Transpiled: ', transpiled);

                return transpiled;
            })
            .then(contents => {
                if (!options.minify) {
                    return Promise.resolve(contents);
                }

                const uglifyIngredient = new UglifyIngredient(this.config, options);

                const uglified = uglifyIngredient.run(contents);
                Logger.debug('Uglified js code:', uglified);

                return uglified;
            })
            .then(
                result => this.writeDistFile(
                    this.moduleName, 'js', 'js', result, options.minify
                )
            );
    }

    getRelevantFiles() {
        return this.makeGlobArray(JS_SEARCH);
    }
}

module.exports = JsTask;
