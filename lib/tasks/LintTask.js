const Task = require('./Task');
const Timer = require('../Timer');
const Logger = require('../Logger');
const ESLintIngredient = require('../ingredients/ESLintIngredient');
const HTMLHintIngredient = require('../ingredients/HTMLHintIngredient');
const glob = require('multi-glob').glob;

const JS_SEARCH = [
    '/**/*.js',
    '/**/*.html',
];

class LintTask extends Task {
    run(options) {
        const timer = new Timer;
        timer.start();

        return this.runLinter(options)
            .then(() => {
                const time = timer.end()
                    .humanize();

                Logger.info(`Lint task for ${this.moduleName} finished in: ${time}.`);
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

    getJsFiles() {
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

    lintJs(files) {
        const esLintIngredient = new ESLintIngredient(this.config, options);

        return esLintIngredient.run(files);
    }

    lintHtml(files) {
        const htmlHintIngredient = new HTMLHintIngredient(this.config, options);

        return htmlHintIngredient.run(files);
    }

    runLinter(options) {
        return Promise.all([
            this.getTemplateFiles(),
            this.getJsFiles()
        ]).then((result) => {
            const htmlFiles = result[0];
            const jsFiles = result[1];

            return Promise.all([
                this.lintJs(jsFiles),
                this.lintHtml(htmlFiles)
            ]);
        }).then((result) => {

        });
    }

    getRelevantJsFiles() {
        const moduleFolderPath = this.getModuleFolderPath();

        return JS_SEARCH.map((path) => moduleFolderPath + path);
    }

    getRelevantHtmlFiles() {
        const moduleFolderPath = this.getModuleFolderPath();

        return HTML_SEARCH.map((path) => moduleFolderPath + path);
    }

    getRelevantFiles() {
        return [
            this.getRelevantJsFiles(),
            this.getRelevantHtmlFiles()
        ].flatten();
    }
}

module.exports = LintTask;
