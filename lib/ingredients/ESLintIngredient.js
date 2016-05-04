const LintIngredient = require('./LintIngredient');
const CLIEngine = require('eslint').CLIEngine;
const fs = require('fs');

class ESLintIngredient extends LintIngredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({
            extends: 'airbnb',
            rules: {
                indent: [2, 4, {
                    SwitchCase: 1,
                    VariableDeclarator: 1
                }]
            },
            env: {
                browser: true
            }
        }, this.getIngredientConfig('ESLint'));
    }

    createIgnoreResult(file) {
        return {
    		filePath: file,
    		messages: [{
    			fatal: false,
    			severity: 1,
    			message: file.indexOf('node_modules/') < 0 ?
    				'File ignored because of .eslintignore file' :
    				'File ignored because it has a node_modules/** path'
    		}],
    		errorCount: 0,
    		warningCount: 1
    	};
    }

    isErrorMessage(message) {
    	let level = message.fatal ? 2 : message.severity;

    	if (Array.isArray(level)) {
    		level = level[0];
    	}

    	return (level > 1);
    }

    filterResult(file, filter) {
    	if (typeof filter !== 'function') {
    		filter = this.isErrorMessage;
    	}

    	const messages = result.messages.filter(filter, result);

    	return {
    		filePath: file,
    		messages,
    		errorCount: messages.reduce(countErrorMessage, 0),
    		warningCount: messages.reduce(countWarningMessage, 0),
    	};
    }

    lintFile(linter, file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, contents) => {
                if (err) {
                    reject(err);
                } else {
                    let result = linter.executeOnText(contents.toString(), file).results[0];

                    if (this.ingredientConfig.quiet) {
                        result = util.filterResult(result, options.quiet);
                    }

                    resolve(result);
                }
            });
        });
    }

    run(files) {
        const linter = new CLIEngine(this.ingredientConfig);

        return Promise.all(
            files.map((file) => {
                if (linter.isPathIgnored(file)) {
                    if (linter.options.ignore && this.ingredientConfig.warnFileIgnored) {
                        return Promise.resolve(this.createIgnoreResult(file));
                    }
                } else {
                    return this.lintFile(linter, file);
                }

                return Promise.resolve();
            })
        ).then((result) => {
            const message = result.map((fileResult) => {
                if (Array.isArray(fileResult.messages) && fileResult.messages.length > 0) {
                    return this.formatFileReport({
                        filePath: fileResult.filePath,
                        messages: fileResult.messages.map((message) =>
                            Object.assign(message, {
                                type: message.severity === 1 ? 'warning' : 'error'
                            })
                        ),
                    });
                } else {
                    return '';
                }
            }).join('');

            return {
                message,
                errorCount: result.sum((fileResult) => {
                    return fileResult.errorCount;
                }),
            };
        });
    }
}

module.exports = ESLintIngredient;
