const Task = require('./Task');
const AngularTemplateCache = require('../ingredients/AngularTemplateCache');
const HTMLHint = require('../ingredients/HTMLHint');
const ESLint = require('../ingredients/ESLint');
const Uglify = require('../ingredients/Uglify');
const NgAnnotate = require('../ingredients/NgAnnotate');
const glob = require('multi-glob').glob;
const Logger = require('../Logger');

const HTML_SEARCH = '/**/*.html';
const JS_SEARCH = [
    '/app/**/*.js',
    '/angular/**/*.js'
];

class AngularTask extends Task {
    run(options) {
        const moduleFolderPath = this.getModuleFolderPath();

        this.compileTemplates(options, moduleFolderPath)
            .then((templateCache) => {
                return this.compileAngular(options, moduleFolderPath, templateCache);
            })
            .catch((err) => {
                Logger.error(err);
            });
    }

    getTemplateFiles(moduleFolderPath) {
        return new Promise((resolve, reject) => {
            glob(moduleFolderPath + HTML_SEARCH, (err, files) => {
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
        this.getAngularFiles(moduleFolderPath)
            .then((files) =>  {
                const ngAnnotate = new NgAnnotate(this.config, options);

                return ngAnnotate.run(this.moduleName, files, templateCache);
            })
            .then((annotated) => {
                const uglify = new Uglify(this.config, options);

                return uglify.run(this.moduleName, annotated);
            })
            .then((uglified) => {
                console.log(uglified);
            })
            .catch((err) => {
                Logger.error(err);
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
            })
            .catch((err) => {
                Logger.error(err);
            });
    }
}

module.exports = AngularTask;
