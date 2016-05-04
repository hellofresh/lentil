const Task = require('./Task');
const AngularTemplateCacheIngredient = require('../ingredients/AngularTemplateCacheIngredient');
const UglifyIngredient = require('../ingredients/UglifyIngredient');
const NgAnnotateIngredient = require('../ingredients/NgAnnotateIngredient');
const glob = require('multi-glob').glob;
const Logger = require('../Logger');
const Timer = require('../Timer');

const HTML_SEARCH = [
    '/**/*.html'
];

const JS_SEARCH = [
    '/app/**/*.js',
    '/angular/**/*.js',
    '!/**/*Spec.js'
];

class AngularTask extends Task {
    run(options) {
        const timer = new Timer;
        timer.start();

        return this.compileTemplates(options)
            .then((templateCache) => {
                return this.compileAngular(options, templateCache);
            })
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.info(`Angular task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err);
            });
    }

    getTemplateFiles() {
        return new Promise((resolve, reject) => {
            glob(this.getRelevantHtmlFiles(), (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            })
        });
    }

    getAngularFiles() {
        return new Promise((resolve, reject) => {
            glob(this.getRelevantJsFiles(), (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
    }

    compileAngular(options, templateCache) {
        return this.getAngularFiles()
            .then((files) =>  {
                Logger.debug('Compiling the following JS files:', files);

                const ngAnnotateIngredient = new NgAnnotateIngredient(this.config, options);

                return ngAnnotateIngredient.run(this.moduleName, files, templateCache);
            })
            .then((annotated) => {
                if (!options.shouldMinify) {
                    return Promise.resolve(annotated);
                }

                const uglifyIngredient = new UglifyIngredient(this.config, options);

                const uglified = uglifyIngredient.run(annotated);
                Logger.debug('Uglified angular code:', uglified);

                return uglified;
            })
            .then((result) => {
                return this.writeDistFile(this.moduleName, 'angular', 'js', result, options.shouldMinify);
            });
    }

    compileTemplates(options, moduleFolderPath) {
        return this.getTemplateFiles(moduleFolderPath)
            .then((files) => {
                Logger.debug('Compiling the following HTML files:', files);

                const angularTemplateCacheIngredient = new AngularTemplateCacheIngredient(this.config, options);

                return angularTemplateCacheIngredient.run(this.moduleName, files);
            })
            .then(function(templateCache) {
                Logger.debug('Template cache generated', templateCache);

                return templateCache;
            });
    }

    getRelevantJsFiles() {
        const moduleFolderPath = this.getModuleFolderPath();

        return JS_SEARCH.map((path) => {
            return moduleFolderPath + path;
        });
    }

    getRelevantHtmlFiles() {
        const moduleFolderPath = this.getModuleFolderPath();

        return HTML_SEARCH.map((path) => {
            return moduleFolderPath + path;
        });
    }

    getRelevantFiles() {
        return [
            this.getRelevantJsFiles(),
            this.getRelevantHtmlFiles()
        ].flatten();
    }
}

module.exports = AngularTask;
