const Ingredient = require('./Ingredient');
const ngAnnotate = require('ng-annotate');
const fs = require('fs');

class NgAnnotate extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({
            single_quotes: true,
            remove: true,
            add: true
        }, this.getIngredientConfig('NgAnnotate'));
    }

    mergeJsContent(files, templateCache = '') {
        return files.map(function(file) {
            return fs.readFileSync(file).toString();
        }) + "\n" + templateCache;
    }

    run(moduleName, files, templateCache = '') {
        const jsContent = this.mergeJsContent(files, templateCache);

        const result = ngAnnotate(jsContent, this.ingredientConfig);

        if (result.errors) {
            throw new Error('NgAnnotate returned errors: ' + result.errors.join('\n'));
        }

        return result.src;
    }
}

module.exports = NgAnnotate;
