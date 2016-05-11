const Ingredient = require('./Ingredient');
const ngAnnotate = require('ng-annotate');
const FileSystem = require('../FileSystem');

class NgAnnotateIngredient extends Ingredient {
    constructor(config, options) {
        super(config, options);

        this.ingredientConfig = Object.assign({
            single_quotes: true,
            remove: true,
            add: true,
        }, this.getIngredientConfig('NgAnnotate'));
    }

    mergeJsContent(files, templateCache = '') {
        return FileSystem.concat(files)
            .then((contents) => `${contents}\n${templateCache}`);
    }

    run(files, templateCache = '') {
        return this.mergeJsContent(files, templateCache)
            .then((contents) => {
                const result = ngAnnotate(contents, this.ingredientConfig);

                if (result.errors) {
                    throw new Error(`NgAnnotate returned errors: ${result.errors.join('\n')}`);
                }

                return result.src;
            });
    }
}

module.exports = NgAnnotateIngredient;
