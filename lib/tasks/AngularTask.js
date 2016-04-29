const Task = require('./Task');
const AngularTemplateCache = require('../ingredients/AngularTemplateCache');
const HTMLHint = require('../ingredients/HTMLHint');
const ESLint = require('../ingredients/ESLint');
const Uglify = require('../ingredients/Uglify');
const NgAnnotate = require('../ingredients/NgAnnotate');
const glob = require('multi-glob').glob;
const Logger = require('../Logger');

const HTML_SEARCH = '/**/*.html';

class AngularTask extends Task {
    run(options) {
        var moduleFolderPath = this.getModuleFolderPath();

        this.compileTemplates(options, moduleFolderPath)
            .then((templateCache) => {

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

    compileTemplates(options, moduleFolderPath) {
        this.getTemplateFiles(moduleFolderPath)
            .then((files) => {
                Logger.debug('Compiling the following HTML files:', files);

                var angularTemplateCache = new AngularTemplateCache(this.config, options);

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
