const Task = require('./Task');
const AngularTemplateCacheIngredient = require('../ingredients/AngularTemplateCacheIngredient');
const UglifyIngredient = require('../ingredients/UglifyIngredient');
const NgAnnotateIngredient = require('../ingredients/NgAnnotateIngredient');
const globby = require('globby');
const Logger = require('../Logger');
const Timer = require('../Timer');

const HTML_SEARCH = [
    '/**/*.html',
];

const JS_SEARCH = [
    '/app/**/*.js',
    '/angular/**/*.js',
    '!/**/*Spec.js',
];

class AngularTask extends Task {
    run(options) {
        const timer = new Timer;
        timer.start();

        return this.compileTemplates(options)
            .then((templateCache) => this.compileAngular(options, templateCache))
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.info(`Angular task for ${this.moduleName} finished in: ${time}.`);
            })
            .catch((err) => {
                Logger.error(err);

                return Promise.reject(err);
            });
    }

    getTemplateFiles() {
        return globby(this.getRelevantHtmlFiles());
    }

    getAngularFiles() {
        return globby(this.getRelevantJsFiles());
    }

    compileAngular(options, templateCache) {
        return this.getAngularFiles()
            .then((files) => {
                Logger.debug('Compiling the following JS files:', files);

                const ngAnnotateIngredient = new NgAnnotateIngredient(this.config, options);

                return ngAnnotateIngredient.run(files, templateCache);
            })
            .then((annotated) => {
                if (!options.minify) {
                    return Promise.resolve(annotated);
                }

                const uglifyIngredient = new UglifyIngredient(this.config, options);

                const uglified = uglifyIngredient.run(annotated);
                Logger.debug('Uglified angular code:', uglified);

                return uglified;
            })
            .then((result) => this.writeDistFile(this.moduleName, 'angular',
                'js', result, options.minify));
    }

    compileTemplates(options, moduleFolderPath) {
        return this.getTemplateFiles(moduleFolderPath)
            .then((files) => {
                Logger.debug('Compiling the following HTML files:', files);

                const angularTemplateCacheIngredient =
                    new AngularTemplateCacheIngredient(this.config, options);

                return angularTemplateCacheIngredient.run(this.moduleName, files);
            })
            .then((templateCache) => {
                Logger.debug('Template cache generated', templateCache);

                return templateCache;
            });
    }

    getRelevantJsFiles() {
        return this.makeGlobArray(JS_SEARCH);
    }

    getRelevantHtmlFiles() {
        return this.makeGlobArray(HTML_SEARCH);
    }

    getRelevantFiles() {
        return [
            this.getRelevantJsFiles(),
            this.getRelevantHtmlFiles(),
        ].flatten();
    }
}

module.exports = AngularTask;
