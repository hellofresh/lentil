const Task = require('./Task');
const Timer = require('../Timer');
const Logger = require('../Logger');
const ESLintIngredient = require('../ingredients/ESLintIngredient');
const HTMLHintIngredient = require('../ingredients/HTMLHintIngredient');
const globby = require('globby');

const JS_SEARCH = [
    '/**/*.js',
    '!/**/*Spec.js',
];

const HTML_SEARCH = [
    '/**/*.html',
];

class LintTask extends Task {
    run(options) {
        const timer = new Timer;
        timer.start();

        return this.runLinter(options)
            .then((result) => {
                const time = timer.end()
                    .humanize();

                Logger.info(`Lint task for ${this.moduleName} finished in: ${time}.`);

                return result;
            })
            .catch((err) => {
                Logger.error(err);

                return Promise.reject(err);
            });
    }

    getTemplateFiles() {
        return globby(this.getRelevantHtmlFiles());
    }

    getJsFiles() {
        return globby(this.getRelevantJsFiles());
    }

    lintJs(options, files) {
        const esLintIngredient = new ESLintIngredient(this.config, options);

        return esLintIngredient.run(files);
    }

    lintHtml(options, files) {
        const htmlHintIngredient = new HTMLHintIngredient(this.config, options);

        return htmlHintIngredient.run(files);
    }

    runLinter(options) {
        return Promise.all([
            this.getTemplateFiles(),
            this.getJsFiles(),
        ]).then((result) => {
            const htmlFiles = result[0];
            const jsFiles = result[1];

            return Promise.all([
                this.lintJs(options, jsFiles),
                this.lintHtml(options, htmlFiles),
            ]);
        }).then((result) => {
            process.stdout.write(`ESLint results:\n${result[0].output}`);
            process.stdout.write(`HTMLHint results:\n${result[1].output}`);

            return Promise.resolve({
                errorCount: result[0].errorCount + result[1].errorCount,
            });
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

module.exports = LintTask;
