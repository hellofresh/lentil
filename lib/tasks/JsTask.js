const Task = require('./Task');
const Uglify = require('../ingredients/Uglify');
const glob = require('multi-glob').glob;
const Logger = require('../Logger');
const Timer = require('../Timer');
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
                Logger.error(err);
            });
    }

    getJsFiles(moduleFolderPath) {
        return new Promise((resolve) => {
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

    getContents(files) {
        return Promise.resolve(files.map((file) => {
            return fs.readFileSync(file).toString();
        }).join(''));
    }

    compileJs(options, moduleFolderPath) {
        return this.getJsFiles(moduleFolderPath)
            .then((files) => {
                return this.getContents(files);
            })
            .then((contents) => {
                if (options.shouldMinify) {
                    const uglify = new Uglify(this.config, options);

                    const uglified = uglify.run(this.moduleName, contents);
                    Logger.debug('Uglified js code:', uglified);

                    return uglified;
                }

                return contents;
            })
            .then((uglified) => {
                return this.writeDistFile(this.moduleName, 'js', 'js', uglified);
            });
    }
}

module.exports = JsTask;
