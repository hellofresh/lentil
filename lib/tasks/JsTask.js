const Task = require('./Task');
const UglifyIngredient = require('../ingredients/UglifyIngredient');
const glob = require('multi-glob').glob;
const Logger = require('../Logger');
const Timer = require('../Timer');
const FileSystem = require('../FileSystem');
const fs = require('fs');

const JS_SEARCH = [
    '/js/**/*.js'
];

class JsTask extends Task {
    run(options) {
        const moduleFolderPath = this.getModuleFolderPath();

        const timer = new Timer;
        timer.start();

        return this.compileJs(options, moduleFolderPath)
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.log(`JS task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err.message);
            });
    }

    getJsFiles(moduleFolderPath) {
        return new Promise((resolve, reject) => {
            glob(JS_SEARCH.map((path) => {
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

    compileJs(options, moduleFolderPath) {
        return this.getJsFiles(moduleFolderPath)
            .then((files) => {
                Logger.debug('Compiling the following JS files:', files);

                return FileSystem.concat(files);
            })
            .then((contents) => {
                if (!options.shouldMinify) {
                    return Promise.resolve(contents);
                }

                const uglifyIngredient = new UglifyIngredient(this.config, options);

                const uglified = uglifyIngredient.run(contents);
                Logger.debug('Uglified js code:', uglified);

                return uglified;
            })
            .then((result) => {
                return this.writeDistFile(this.moduleName, 'js', 'js', result, options.shouldMinify);
            });
    }
}

module.exports = JsTask;
