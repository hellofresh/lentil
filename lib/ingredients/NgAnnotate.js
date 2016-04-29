const Ingredient = require('./Ingredient');
const ngAnnotate = require('ng-annotate');
const fs = require('fs');

class NgAnnotate extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.specificOptions = Object.merge({
            single_quotes: true,
            remove: true,
            add: true
        }, this.getSpecificOptionsForIngredient('NgAnnotate'));
    }

    mergeJsContent(files, templateCache = '') {
        return files.map(function(file) {
            return fs.readFileSync(file).toString();
        }) + "\n" + templateCache;
    }

    run(moduleName, files, templateCache = '') {
        const jsContent = this.mergeJsContent(files, templateCache);

        const result = ngAnnotate(jsContent, this.specificOptions);

        return result.src;
    }
}

module.exports = NgAnnotate;
