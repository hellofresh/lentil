const Ingredient = require('./Ingredient');
const minify = require('html-minifier').minify;
const fs = require('fs');
const Mustache = require('mustache');
const path = require('path');

class AngularTemplateCacheIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({
            root: '/',
            templateFileName: 'angularTemplateCache.mustache',
            minify: {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                keepClosingSlash: false,
                minifyCSS: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeRedundantAttributes: true,
                quoteCharacter: '"',
                preserveLineBreaks: false,
            },
        }, this.getIngredientConfig('AngularTemplateCache'));
    }

    getTemplateFile() {
        return new Promise((resolve, reject) => {
            const templatePath = path.join(`${this.config.get('paths.templates')}`, this.ingredientConfig.templateFileName);

            fs.readFile(templatePath, (err, contents) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(contents.toString());
                }
            });
        });
    }

    generateUrl(filePath) {
        const templatePath = path.normalize(filePath);

        let url;
        if (typeof this.ingredientConfig.base === 'function') {
            url = path.join(
                this.ingredientConfig.root, this.ingredientConfig.base(templatePath)
            );
        } else {
            url = path.join(this.ingredientConfig.root, templatePath.replace(
                this.ingredientConfig.base || path.dirname(templatePath), '')
            );
        }

        if (typeof this.ingredientConfig.transformUrl === 'function') {
            url = this.ingredientConfig.transformUrl(url);
        }

        return url;
    }

    addslashes(str) {
        return (`${str}`).replace(/[\\']/g, '\\$&').replace(/\u0000/g, '\\0');
    }

    minify(html) {
        return minify(html, this.ingredientConfig.minify);
    }

    getFileContent(filePath) {
        const minified = this.minify(fs.readFileSync(filePath).toString());
        const slashed = this.addslashes(minified);

        return slashed;
    }

    run(moduleName, files) {
        return this.getTemplateFile()
            .then((templateFile) => Mustache.render(templateFile, {
                moduleName,
                templates: files.map((filePath) => ({
                    content: this.getFileContent(filePath),
                    url: this.generateUrl(filePath),
                })),
            }));
    }
}

module.exports = AngularTemplateCacheIngredient;
