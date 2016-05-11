const LintIngredient = require('./LintIngredient');
const HTMLHint = require('htmlhint').HTMLHint;
const fs = require('fs');

class HTMLHintIngredient extends LintIngredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'attr-value-not-empty': false,
            'attr-no-duplication': true,
            'doctype-first': false,
            'tag-pair': true,
            'tag-self-close': false,
            'spec-char-escape': true,
            'id-unique': true,
            'src-not-empty': true,
            'title-require': true,
            'head-script-disabled': true,
            'alt-require': true,
            'doctype-html5': true,
            'id-class-value': true,
            'style-disabled': true,
            'inline-style-disabled': true,
            'inline-script-disabled': true,
            'space-tab-mixed-disabled': true,
            'id-class-ad-disabled': true,
            'href-abs-or-rel': false,
            'attr-unsafe-chars': true,
        }, this.getIngredientConfig('HTMLHint'));
    }

    getFileContents(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, contents) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(contents.toString());
                }
            });
        });
    }

    run(files) {
        return Promise.all(
            files.map((file) =>
                this.getFileContents(file)
                    .then((contents) => ({
                        filePath: file,
                        report: HTMLHint.verify(contents, this.ingredientConfig),
                    }))
            )
        ).then((result) => {
            const output = result.map((fileResult) => {
                if (Array.isArray(fileResult.report) && fileResult.report.length > 0) {
                    return this.formatFileReport({
                        filePath: fileResult.filePath,
                        messages: fileResult.report.map((message) =>
                            Object.assign(message, {
                                ruleId: message.rule.id,
                                column: message.col,
                            })
                        ),
                    });
                }

                return '';
            }).join('');

            return {
                output,
                errorCount: result.map((fileResult) =>
                    Array.isArray(fileResult.report) &&
                        fileResult.report.length > 0 && fileResult.report.count(
                            (message) => message.type === 'error'
                        )
                ).sum(),
            };
        });
    }
}

module.exports = HTMLHintIngredient;
