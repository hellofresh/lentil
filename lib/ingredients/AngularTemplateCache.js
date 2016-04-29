const Ingredient = require('./Ingredient');
const minify = require('html-minifier').minify;
const fs = require('fs');
const Mustache = require('mustache');
const path = require('path');

class AngularTemplateCache extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.specificOptions = Object.merge({
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
                quoteCharacter: '"'
            }
        }, this.getSpecificOptionsForIngredient('AngularTemplateCache'));
    }

    getTemplateFile() {
        return fs.readFileSync(this.config.get('paths.templates') + '/' + this.specificOptions.templateFileName).toString();
    }

    generateUrl(filePath) {
        filePath = path.normalize(filePath);

        var url;
        if (typeof this.specificOptions.base === 'function') {
            url = path.join(this.specificOptions.root, this.specificOptions.base(filePath));
        } else {
            url = path.join(this.specificOptions.root, filePath.replace(this.specificOptions.base || path.dirname(filePath), ''));
        }

        if (typeof this.specificOptions.transformUrl === 'function') {
            url = transformUrl(url);
        }

        return url;
    }

    addslashes(str) {
        return (str + '').replace(/[\\']/g, '\\$&').replace(/\u0000/g, '\\0');
    }

    minify(html) {
        return minify(html, this.specificOptions.minify);
    }

    run(moduleName, files) {
        var templateFile = this.getTemplateFile();

        var templateCache = Mustache.render(templateFile, {
            moduleName: moduleName,
            templates: files.map((filePath) => {
                return {
                    content: this.addslashes(this.minify(fs.readFileSync(filePath).toString())),
                    url: this.generateUrl(filePath)
                };
            })
        });

        return templateCache;
    }
}

module.exports = AngularTemplateCache;
