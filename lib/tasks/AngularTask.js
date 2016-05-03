const Task = require('./Task');
const AngularTemplateCache = require('../ingredients/AngularTemplateCache');
const Uglify = require('../ingredients/Uglify');
const NgAnnotate = require('../ingredients/NgAnnotate');
const glob = require('multi-glob').glob;
const Logger = require('../Logger');
const Timer = require('../Timer');

const HTML_SEARCH = [
    '/**/*.html'
];

const JS_SEARCH = [
    '/app/**/*.js',
    '/angular/**/*.js'
];

class AngularTask extends Task {
    run(options) {
        const moduleFolderPath = this.getModuleFolderPath();

        const timer = new Timer;
        timer.start();

        return this.compileTemplates(options, moduleFolderPath)
            .then((templateCache) => {
                return this.compileAngular(options, moduleFolderPath, templateCache);
            })
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.log(`Angular task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err);
            });
    }

    getTemplateFiles(moduleFolderPath) {
        return new Promise((resolve, reject) => {
            glob(HTML_SEARCH.map((path) => {
                return moduleFolderPath + path;
            }), (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            })
        });
    }

    getAngularFiles(moduleFolderPath) {
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

    compileAngular(options, moduleFolderPath, templateCache) {
        return this.getAngularFiles(moduleFolderPath)
            .then((files) =>  {
                const ngAnnotate = new NgAnnotate(this.config, options);

                return ngAnnotate.run(this.moduleName, files, templateCache);
            })
            .then((annotated) => {
                if (!options.shouldMinify) {
                    return Promise.resolve(annotated);
                }

                const uglify = new Uglify(this.config, options);

                return uglify.run(this.moduleName, annotated);
            })
            .then((uglified) => {
                Logger.debug('Uglified angular code:', uglified);

                return this.writeDistFile(this.moduleName, 'angular', 'js', uglified);
            });
    }

    compileTemplates(options, moduleFolderPath) {
        return this.getTemplateFiles(moduleFolderPath)
            .then((files) => {
                Logger.debug('Compiling the following HTML files:', files);

                const angularTemplateCache = new AngularTemplateCache(this.config, options);

                return angularTemplateCache.run(this.moduleName, files);
            })
            .then(function(templateCache) {
                Logger.debug('Template cache generated', templateCache);

                return templateCache;
            });
    }
}

module.exports = AngularTask;
